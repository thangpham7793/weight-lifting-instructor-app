import XLSX from "xlsx"
import fetchService from "../../services/http"

function promisify(f) {
  return function (...args) {
    // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // our custom callback for f
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }

      args.push(callback) // append our custom callback to the end of f arguments

      f.call(this, ...args) // call the original function
    })
  }
}

export class myExcelReader {
  constructor(programmeId) {
    this.reader = new FileReader()
    this.reader.makeTimeTable = function (exercisesArr) {
      const aggregate = {}

      function getWeekDayPair(exercisesArr) {
        let prevPair = [0, 0]
        return exercisesArr.reduce((pairs, { week, day }) => {
          if (prevPair[0] !== week || prevPair[1] !== day) {
            prevPair = [week, day]
            pairs.push([week, day])
          }
          return pairs
        }, [])
      }

      function extractDailyExercises(w, d) {
        exercisesArr
          .filter(({ week, day }) => week === w && day === d)
          .reduce((acc, { exercise, instruction }) => {
            //initialise prop week if not exist
            if (acc[`week ${w}`] === undefined) {
              acc[`week ${w}`] = {}
            }

            //initialise prop day of week if not exist
            if (acc[`week ${w}`][`day ${d}`] === undefined) {
              acc[`week ${w}`][`day ${d}`] = []
            }

            //push obj to proper week and day
            acc[`week ${w}`][`day ${d}`].push({ exercise, instruction })

            return acc
          }, aggregate)
      }

      getWeekDayPair(exercisesArr).forEach((dayInWeek) =>
        extractDailyExercises(dayInWeek[0], dayInWeek[1])
      )
      return aggregate
    }
    this.reader.programmeId = programmeId
    this.reader.onload = async function (event) {
      //console.log(this.programmeId)
      const data = event.target.result
      const workbook = XLSX.read(data, {
        type: "buffer",
      })

      const payload = {
        scheduleName: "",
        timetable: "",
        programmeId: this.programmeId,
        weekCount: 0,
      }

      const rows = []

      workbook.SheetNames.forEach(function (sheetName) {
        //which is actually an array of rows
        const XL_row_object = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        )

        //programmeName here
        payload.scheduleName = sheetName
        rows.push(...XL_row_object)
      })

      payload.timetable = this.makeTimeTable(rows)

      document.getElementById("jsonObject").innerHTML = JSON.stringify(
        payload,
        null,
        4
      )

      payload.weekCount = Math.max.apply(
        null,
        Object.keys(payload.timetable).map((week) => {
          return parseInt(week.substring(week.length - 1))
        })
      )

      const success = await fetchService.postNewSchedule(payload)
      return success
    }

    this.reader.onerror = function (event) {
      console.error("File could not be read! Code " + event.target.error.code)
    }

    this.reader.readAsArrayBufferPromise = promisify(
      this.reader.readAsArrayBuffer
    )
  }
}

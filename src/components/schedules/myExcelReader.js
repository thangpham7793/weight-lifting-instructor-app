import XLSX from "xlsx"
import httpService from "../../services/ProgrammeServiceSingleton"

export class myExcelReader {
  constructor(programmeIds, scheduleName, isNew = true, scheduleId = null) {
    this.reader = new FileReader()
    this.reader.programmeIds = programmeIds
    this.reader.scheduleName = scheduleName
    this.reader.isNew = isNew
    this.reader.scheduleId = scheduleId
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
          .reduce((acc, { exerciseName, instruction }) => {
            //initialise prop week if not exist
            if (acc[`week ${w}`] === undefined) {
              acc[`week ${w}`] = {}
            }

            //initialise prop day of week if not exist
            if (acc[`week ${w}`][`day ${d}`] === undefined) {
              acc[`week ${w}`][`day ${d}`] = []
            }

            //push obj to proper week and day
            acc[`week ${w}`][`day ${d}`].push({ exerciseName, instruction })

            return acc
          }, aggregate)
      }

      getWeekDayPair(exercisesArr).forEach((dayInWeek) =>
        extractDailyExercises(dayInWeek[0], dayInWeek[1])
      )
      return aggregate
    }
    this.reader.onload = async function (event) {
      const data = event.target.result
      const workbook = XLSX.read(data, {
        type: "buffer",
      })

      const rows = []

      workbook.SheetNames.forEach(function (sheetName) {
        //which is actually an array of rows
        const XL_row_object = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        )
        rows.push(...XL_row_object)
      })

      let payload = { timetable: this.makeTimeTable(rows) }
      let isActionSuccess

      if (isNew) {
        payload = {
          ...payload,
          scheduleName: this.scheduleName,
          programmeIds: this.programmeIds,
          weekCount: workbook.SheetNames.length,
        }
        isActionSuccess = await httpService.postNewSchedule(payload)
      } else {
        payload = {
          ...payload,
          scheduleId: this.scheduleId,
          weekCount: workbook.SheetNames.length,
        }
        isActionSuccess = await httpService.repostSchedule(payload)
      }
      return isActionSuccess
    }

    this.reader.onerror = (event) => {
      console.error("File could not be read! Code " + event.target.error.code)
    }

    this.reader.readAsArrayBufferPromise = (file) => {
      return new Promise((resolve, reject) => {
        let r = new FileReader()
        r.onload = (e) => resolve(e.target.result)
        r.onerror = reject
        r.readAsArrayBuffer(file)
      })
    }
  }
}

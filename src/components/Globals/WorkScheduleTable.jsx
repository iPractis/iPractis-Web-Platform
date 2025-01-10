import {
  columnsHeaderWorkSchedule,
  rowsWorkSchedule,
} from "@/src/data/dataTeacherRegistration";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const WorkScheduleTable = () => {
  return (
    <Table
      classNames={{
        th: "bg-transparent !bg-none p-0",
        table: " border-separate border-spacing-y-1",
      }}
      removeWrapper
    >
      <TableHeader>
        <TableColumn className="pr-1.5 w-[48.50px]" key="custom-column">
          <div className="bg-primary-color-P1 text-primary-color-P12 flex justify-center items-center rounded-md ST-SB-3 h-6 w-full">
            <p>D</p>
          </div>

          <div className="bg-primary-color-P1 text-primary-color-P12 flex justify-center items-center rounded-md ST-SB-3 h-6 w-full mt-1.5">
            <p>T</p>
          </div>
        </TableColumn>

        {columnsHeaderWorkSchedule.map((column) => (
          <TableColumn className="h-[54px] w-[48.50px]" key={column.key}>
            <div className="bg-primary-color-P1 text-primary-color-P12 text-center rounded-lg p-1 h-full w-[90%] flex flex-col justify-center">
              <div className="ST-SB-3 !px-0">{column.label}</div>
              <div className="bg-primary-color-P12 rounded-md flex justify-center items-center mt-1.5 h-5">
                <p className="text-primary-color-P1 ST-4">X</p>
              </div>
            </div>
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody>
        {rowsWorkSchedule.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="p-0 w-[40.50px] pr-1.5 pb-2">
              <div className="bg-primary-color-P1 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[75%] mx-auto">
                {row?.count}
              </div>
            </TableCell>

            <TableCell className="p-0 w-[40.50px] pr-1.5 pb-2">
              <div className="bg-primary-color-P11 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[90%] mx-auto">
                {row?.label}
              </div>
            </TableCell>

            <TableCell className="p-0 w-[40.50px] pr-1.5 pb-2">
              <div className="bg-primary-color-P11 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[90%] mx-auto">
                {row?.label}
              </div>
            </TableCell>

            <TableCell className="p-0 w-[40.50px] pr-1.5 pb-2">
              <div className="bg-primary-color-P11 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[90%] mx-auto">
                {row?.label}
              </div>
            </TableCell>

            <TableCell className="p-0 w-[40.50px] pr-1.5 pb-2">
              <div className="bg-primary-color-P11 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[90%] mx-auto">
                {row?.label}
              </div>
            </TableCell>

            <TableCell className="p-0 w-[40.50px] pr-1.5 pb-2">
              <div className="bg-primary-color-P11 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[90%] mx-auto">
                {row?.label}
              </div>
            </TableCell>

            <TableCell className="p-0 w-[40.50px] pr-1.5 pb-2">
              <div className="bg-primary-color-P11 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[90%] mx-auto">
                {row?.label}
              </div>
            </TableCell>

            <TableCell className="p-0 w-[40.50px] pr-1.5 pb-2">
              <div className="bg-primary-color-P11 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-[22px] w-[90%] mx-auto">
                {row?.label}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WorkScheduleTable;

import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { api } from "../utils/api";

export function ContactsTable() {
    const { data: contacts } = api.contacts.getAll.useQuery();

    const columnHelper = createColumnHelper<NonNullable<typeof contacts>[0]>();
  
    const columns = [
      columnHelper.accessor("username", {}),
      columnHelper.accessor("email", {}),
    ];
  
    const table = useReactTable({
      data: contacts ?? [],
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return <table className="mt-8">
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="p-1 bg-[hsl(280,100%,70%)] text-white text-center min-w-[10rem]">
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="border border-white">
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
}
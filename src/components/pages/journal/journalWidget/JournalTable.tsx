import { FC, useContext, useState, useEffect } from "react";
import { IRecord } from "../../../../store/Interfaces";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TableFooter,
} from "@mui/material";
import RecordItem from "./RecordItem";
import {
  FilterList as FilterListIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

interface HeadCell {
  id: string;
  label: string;
}

type Order = "asc" | "desc";

const headCells: readonly HeadCell[] = [
  {
    id: "_id",
    label: "IDS",
  },
  {
    id: "area",
    label: "Зона",
  },
  {
    id: "node",
    label: "Узел",
  },
  {
    id: "date",
    label: "Дата",
  },
  {
    id: "user",
    label: "Пользователь",
  },
];

const JournalTable: FC = () => {
  const { journalStore } = useContext(Context);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const [orderBy, setOrderBy] = useState(headCells[0].id);
  const [order, setOrder] = useState<Order>("asc");

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - journalStore.modedRecords.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort =
    (id: string) => (event: React.MouseEvent<unknown>) => {
      const isAsc = order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    };

  useEffect(() => {
    journalStore.sortRecords(order, orderBy);
  }, [journalStore, order, orderBy]);

  return (
    <TableContainer>
      <Table size="small" aria-label="collapsible table" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  onClick={handleRequestSort(headCell.id)}
                  direction={orderBy === headCell.id ? order : "asc"}
                  IconComponent={FilterListIcon}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? journalStore.modedRecords.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : journalStore.modedRecords
          ).map((record: IRecord) => {
            return <RecordItem key={record._id} record={record} />;
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={5}
              count={journalStore.modedRecords.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[{ label: "Все", value: -1 }, 1, 2]}
              page={page}
              labelRowsPerPage="Строк на странице:"
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}–${to} из ${
                  count !== -1 ? count : `более чем ${to}`
                }`;
              }}
              rowsPerPage={rowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default observer(JournalTable);

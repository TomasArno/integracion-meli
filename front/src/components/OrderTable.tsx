import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { useState } from "react";
import { buildQuery } from "../utils/buildQuery";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>x</MenuItem>
        <MenuItem>x</MenuItem>
        <MenuItem>x</MenuItem>
        <Divider />
        <MenuItem color="danger">x</MenuItem>
      </Menu>
    </Dropdown>
  );
}

const statusMap = {
  payment_in_process: "pendiente_acreditar",
  paid: "pago",
  partially_refunded: "devuelto",
  pending_cancel: "pendiente_cancelar",
  cancelled: "cancelado",
};

export default function OrderTable() {
  const [order, setOrder] = useState<Order>("desc");
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    orderState: "paid",
    orderDateFrom: "",
    orderDateTo: "",
  });
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = (
    filter: "orderState" | "q" | "orderDateFrom" | "orderDateTo",
    newValue: string | null
  ) => {
    console.log(filter, newValue);

    const newFilter = {};
    newFilter[filter] = newValue;

    setFilters((currentFilters) => {
      return {
        ...currentFilters,
        ...newFilter,
      };
    });
  };

  const fetchOrders = async () => {
    const response = await fetch(
      "http://localhost:8080/sales" + buildQuery({ ...filters, pass: 1 })
    );
    if (response.status != 200) return setOrders([]); // manejar con modal

    const data = await response.json();

    setOrders(data.data);
  };

  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Desde</FormLabel>
        <Input
          onChange={(e) =>
            handleChange(
              "orderDateFrom",
              new Date(e.target.value).toISOString()
            )
          }
          type="date"
          size="sm"
          placeholder="Buscar"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Hasta</FormLabel>
        <Input
          onChange={(e) =>
            handleChange("orderDateTo", new Date(e.target.value).toISOString())
          }
          type="date"
          size="sm"
          placeholder="Buscar"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Estado</FormLabel>
        <Select
          onChange={(e, value: string) => handleChange("orderState", value)}
          size="sm"
          value={filters.orderState}
          placeholder="Pendiente"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="payment_in_process">Pendiente de acreditar</Option>
          <Option value="paid">Pago</Option>
          <Option value="payment_in_process">Pendiente de cancelar</Option>
          <Option value="cancelled">Cancelado</Option>
          <Option value="partially_refunded">Devuelto</Option>
        </Select>
      </FormControl>

      <FormControl sx={{ marginLeft: "20px" }} size="sm">
        <FormLabel sx={{ visibility: "hidden" }}>hidden</FormLabel>
        <Button
          color="primary"
          // startDecorator={<DownloadRoundedIcon />}
          size="sm"
          onClick={fetchOrders}
        >
          Descargar Ventas
        </Button>
      </FormControl>
    </>
  );

  return (
    <>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Buscar"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filtros
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Subir
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Buscar por ID</FormLabel>
          <Input
            onChange={(e) =>
              e.target.value.length == 16 && handleChange("q", e.target.value)
            }
            size="sm"
            placeholder="29542881"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
          height: "100%",
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== orders.length
                  }
                  checked={selected.length === orders.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? orders.map((row) => row.id) : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === orders.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                    order === "desc"
                      ? { "& svg": { transform: "rotate(0deg)" } }
                      : { "& svg": { transform: "rotate(180deg)" } },
                  ]}
                >
                  ID
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Fecha</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Estado</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Cliente</th>
              <th style={{ width: 140, padding: "12px 6px" }}> </th>
            </tr>
          </thead>
          <tbody>
            {[...orders].sort(getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "primary" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.createdAt}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        pago: <CheckRoundedIcon />,
                        devuelto: <AutorenewRoundedIcon />,
                        cancelado: <BlockIcon />,
                      }[statusMap[row.status]]
                    }
                    color={
                      {
                        pago: "success",
                        devuelto: "neutral",
                        cancelado: "danger",
                      }[statusMap[row.status]] as ColorPaletteProp
                    }
                  >
                    {statusMap[row.status].toUpperCase()[0] +
                      statusMap[row.status].slice(1)}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <div>
                      <Typography level="body-xs">
                        {`${row.buyerData.firstName} ${row.buyerData.lastName}`}
                      </Typography>
                      <Typography level="body-xs">
                        {`${row.buyerData.ivaCondition} | ${row.buyerData.docNumber}`}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Link level="body-xs" component="button">
                      x
                    </Link>
                    <RowMenu />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Anterior
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1", "2", "3"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Siguiente
        </Button>
      </Box>
    </>
  );
}

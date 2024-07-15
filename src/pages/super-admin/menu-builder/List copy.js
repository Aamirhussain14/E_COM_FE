/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from '@mui/material';
import React from 'react';
import axios from 'src/utils/axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette.common.black,
    color: theme?.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme?.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const List = (props) => {
  const { menuList } = props;
  const { methods } = props;
  const { setValue, getValue } = methods;

  const handleEdit = async (id) => {
    console.log(id);
    props.setIsNewMenuAdding(true);
    try {
      const response = await axios.get(`/v1/menu/get?menuId=${id}`);
      const { data } = response.data;
      console.log(data);

      setValue('menuId', data.id);
      setValue('menuName', data.menuName);
      setValue('url', data.url);
      setValue('parent', data.parentName);
      setValue('menuSequence', data.seqno);
      setValue('action', 'edit');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubMenu = (id) => {
    console.log(id);
    props.setIsNewMenuAdding(true);
    setValue('parent', id);
  };

  return (
    <Grid container md={12} xs={12} sx={{ display: 'flex', m: 2, width: '95%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Menu</StyledTableCell>
              <StyledTableCell>Sub Menu</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuList.map((row) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {row.menuName}
                  {row.submenu.length > 0 &&
                    row.submenu.map((subRow) => (
                      <StyledTableRow>
                        <StyledTableCell>{subRow.submenuName}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddSubMenu(row.menuId)}
                  >
                    Add Sub Menu
                  </Button>
                  {/* {row.submenu.length > 0 &&
                    row.submenu.map((subRow) => (
                      <StyledTableRow>
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: '#f6fe00', color: 'black' }}
                            onClick={() => handleAddSubMenu(subRow.submenuId)}
                          >
                            Add Sub Menu
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))} */}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEdit(row.menuId)}
                  >
                    Edit
                  </Button>
                  {row.submenu.length > 0 &&
                    row.submenu.map((subRow) => (
                      <StyledTableRow>
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: '#f6fe00', color: 'black' }}
                            onClick={() => handleEdit(subRow.submenuId)}
                          >
                            Edit
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default List;

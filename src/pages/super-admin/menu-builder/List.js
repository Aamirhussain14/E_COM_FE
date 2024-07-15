/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import axios from 'src/utils/axios';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { IconButtonAnimate } from 'src/components/animate';

const List = (props) => {
  const { menuList } = props;
  const { methods } = props;
  const { setValue } = methods;

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

  const renderMenuItems = (menus) =>
    menus.map((menu) => (
      <TreeItem
        key={menu.menuId}
        nodeId={menu.menuId}
        label={
          <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography>{menu.menuName}</Typography>
            <div>
              <IconButtonAnimate
                variant="contained"
                color="primary"
                sx={{ marginRight: '8px', p: 1 }}
                onClick={() => handleAddSubMenu(menu.menuId)}
              >
                <SubdirectoryArrowRightIcon />
              </IconButtonAnimate>
              <IconButtonAnimate
                variant="contained"
                color="secondary"
                onClick={() => handleEdit(menu.menuId)}
              >
                <EditIcon />
              </IconButtonAnimate>
            </div>
          </Grid>
        }
      >
        {menu.submenu && renderMenuItems(menu.submenu)}
      </TreeItem>
    ));

  return (
    <Grid container md={12} xs={12} sx={{ display: 'flex', m: 2, width: '95%' }}>
      <Paper sx={{ width: '100%' }}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ width: '100%' }}
        >
          {renderMenuItems(menuList)}
        </TreeView>
      </Paper>
    </Grid>
  );
};

export default List;

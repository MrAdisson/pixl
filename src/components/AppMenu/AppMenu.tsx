import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const AppMenu = () => {
  return (
    <div>
      <Menu menuButton={<MenuButton>File</MenuButton>}>
        <MenuItem>New File</MenuItem>
        <MenuItem>Open File</MenuItem>
        <MenuItem>Save</MenuItem>
        <SubMenu label='Export'>
          <MenuItem>PNG</MenuItem>
          <MenuItem>GIF</MenuItem>
        </SubMenu>
      </Menu>
      <Menu menuButton={<MenuButton>Edit</MenuButton>}>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Paste</MenuItem>
        <SubMenu label='Image'>
          <MenuItem>Size</MenuItem>
          <SubMenu label='Rotate'>
            <MenuItem>+90</MenuItem>
            <MenuItem>-90</MenuItem>
          </SubMenu>
          <SubMenu label='Flip'>
            <MenuItem>Horizontal</MenuItem>
            <MenuItem>Vertical</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
      <Menu menuButton={<MenuButton>Window</MenuButton>}>
        <MenuItem>Fullscreen</MenuItem>
      </Menu>
    </div>
  );
};

export default AppMenu;

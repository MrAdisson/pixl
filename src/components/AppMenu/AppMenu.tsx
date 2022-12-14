import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { ReactElement, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { initFile, openFile } from '../../reducers/fileReducer';
import { Color } from '../../types/Color';

const AppMenu = () => {
  const file = useAppSelector((state) => state.file.file);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const saveFile = (fileArray: Color[][]) => {
    const fileData = fileArray.map((e) => e.join(',')).join(';');
    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'MyPixelFile.pxl';
    link.href = url;
    link.click();
  };

  const launchInputFile = () => {
    inputFile.current?.click();
  };
  const handleChange = () => {
    inputFile.current?.files?.[0].text().then((fileText) => {
      console.log(fileText);
      const fileArray = fileText.split(';').map((x) => x.split(','));
      dispatch(openFile(fileArray));
      dispatch(initFile(fileArray));
    });
  };

  useEffect(() => {
    console.log(inputFile.current);
  }, [inputFile]);
  return (
    <div>
      <input
        type='file'
        id='file'
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <Menu menuButton={<MenuButton>File</MenuButton>}>
        <MenuItem>New File</MenuItem>
        <MenuItem onClick={() => launchInputFile()}>Open File</MenuItem>
        <MenuItem onClick={() => saveFile(file)}>Save</MenuItem>
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
        <MenuItem onClick={() => document.body.requestFullscreen()}>
          Fullscreen
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AppMenu;

import React, { CSSProperties, useEffect } from 'react';
import AppMenu from '../AppMenu/AppMenu';
import DrawingGrid from '../DrawingGrid/DrawingGrid';
import { useAppDispatch } from '../../hooks/redux';
import { setMouseDown } from '../../reducers/mouseReducer';
import ToolsBar from '../ToolsBar/ToolsBar';

const Editor = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      dispatch(setMouseDown(true));
    };
    const handleMouseUp = () => dispatch(setMouseDown(false));
    document.body.addEventListener('mousedown', handleMouseDown);
    document.body.addEventListener('mouseup', handleMouseUp);

    return () => {
      // 👇️ remove event listener when the component unmounts
      document.body.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mousedown', (e) => handleMouseDown(e));
    };
  }, [dispatch]);

  return (
    <div style={styles.mainContainer as CSSProperties}>
      <AppMenu />
      <ToolsBar />
      <div className='editor' id='editor_container' style={styles.editorContainer}>
        <DrawingGrid height={16} width={16} />
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  menuContainer: {
    maxHeight: 40,
    width: '100%',
  },
  editorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    height: '100%',
    width: '90vw',
    margin: '10px 0px',
    overflow: 'hidden',
  },
};

export default Editor;

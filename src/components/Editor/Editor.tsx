import React, { CSSProperties, useEffect } from 'react';
import AppMenu from '../AppMenu/AppMenu';
import { GithubPicker } from 'react-color';
import DrawingGrid from '../DrawingGrid/DrawingGrid';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  drawMode,
  eyedropperMode,
  grabMode,
  setBrushColor,
  setGridVisibility,
} from '../../reducers/toolsReducer';
import { setMouseDown } from '../../reducers/mouseReducer';

const Editor = () => {
  const dispatch = useAppDispatch();

  const brushColor = useAppSelector((state) => state.tools.brushSettings.brushColor);
  const isGridVisible = useAppSelector((state) => state.tools.gridSettings.visible);
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
    <div className='editor' style={styles.mainContainer as CSSProperties}>
      <AppMenu />
      <div id='tools' style={{ display: 'flex', flexDirection: 'row' }}>
        <GithubPicker
          onChange={(e) => {
            dispatch(drawMode());
            dispatch(setBrushColor(e.hex));
          }}
        />
        <div style={{ height: 30, width: 30, backgroundColor: brushColor }}></div>
        <button onClick={() => dispatch(grabMode())}> grab</button>
        <button onClick={() => dispatch(drawMode())}> draw</button>
        <button onClick={() => dispatch(eyedropperMode())}> PIPETTE</button>
        <label>
          <input
            id='gridVisibilityCheckbox'
            type='checkbox'
            onChange={(e) => dispatch(setGridVisibility(e.target.checked))}
            checked={isGridVisible}
          />
          SHOW GRID
        </label>
      </div>

      <div id='editor_container' style={styles.editorContainer}>
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

import { CSSProperties, useState } from 'react';
import { CompactPicker } from 'react-color';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { FaPaintBrush, FaEyeDropper } from 'react-icons/fa';
import { TbHandGrab } from 'react-icons/tb';
import {
  drawMode,
  setBrushColor,
  grabMode,
  eyedropperMode,
  setGridVisibility,
} from '../../reducers/toolsReducer';

const ToolsBar = () => {
  const dispatch = useAppDispatch();
  const brushColor = useAppSelector((state) => state.tools.brushSettings.brushColor);
  const isGridVisible = useAppSelector((state) => state.tools.gridSettings.visible);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  return (
    <div
      id='tools'
      className='toolsbar'
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={
          colorPickerVisible
            ? (styles.colorPickerPopup as CSSProperties)
            : { display: 'none' }
        }
      >
        <CompactPicker
          onChange={(e) => {
            setColorPickerVisible(false);
            dispatch(drawMode());
            dispatch(setBrushColor(e.hex));
          }}
        />
      </div>

      <div
        className='colorCircle'
        style={{
          height: 30,
          width: 30,
          backgroundColor: brushColor,
          border: '2px solid black',
          borderRadius: 100,
          margin: '2px 5px',
        }}
        onClick={() => setColorPickerVisible(true)}
      ></div>
      <div>
        <button className='toolsButton' onClick={() => dispatch(drawMode())}>
          <FaPaintBrush style={{ margin: 'auto' }} />
        </button>
        <button className='toolsButton' onClick={() => dispatch(grabMode())}>
          <TbHandGrab />
        </button>
        <button className='toolsButton' onClick={() => dispatch(eyedropperMode())}>
          <FaEyeDropper />
        </button>
      </div>

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
  );
};

const styles = {
  colorPickerPopup: {
    position: 'absolute',
    zIndex: '2',
  },
};

export default ToolsBar;

import classes from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

  const rootClases = [classes.myModal];

  if(visible) { rootClases.push(classes._active) }

  return (
    <div onClick={() => setVisible(false)} className={rootClases.join(' ')}>
      <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default MyModal;
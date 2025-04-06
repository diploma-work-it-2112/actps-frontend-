import { useEffect, useRef } from "react";

export default function RouterEditBlock({router, handleClose}){
	const blockRef = useRef(null);

	useEffect(() => {
    const handleClickOutside = (e) => {
      // Если клик не внутри блока, вызываем handleClose
      if (blockRef.current && !blockRef.current.contains(e.target)) {
        handleClose();
      }
    };

    // Подписываемся на событие клика
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      // Удаляем обработчик при размонтировании
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

	return(
		<div className="modal-overlay">
		<div className="router-prop-block" ref={blockRef}>
			<p className="router-prop-block-title">Router Properties</p>
			
			<div className="router-prop-fiels">
				<p className="router-prop-f-title">Ip Address</p>
				<p className="router-prop-f-value">{router.ip_address}</p>
			</div>

			<div className="router-prop-fiels">
				<p className="router-prop-f-title">Hostname</p>
				<p className="router-prop-f-value">{router.hostname}</p>
			</div>

			<div className="router-prop-fiels">
				<p className="router-prop-f-title">Model Name</p>
				<input type="text" className="router-prop-input" value={router.model_name}/>
			</div>

			<div className="router-prop-fiels">
				<p className="router-prop-f-title">Group Name</p>
				<p className="router-prop-f-value">{router.group_name}</p>
			</div>

			<div className="router-prop-fiels">
				<p className="router-prop-f-title">Color</p>
				<p className="router-prop-f-value"><div className="router-prop-f-v-color" style={{backgroundColor: router.color}}></div>{router.color}</p>
			</div>

			<div className="router-prop-fiels">
				<p className="router-prop-f-title">Created at</p>
				<p className="router-prop-f-value">{new Date(router.created_at).toLocaleString()}</p>
			</div>

			
			<div className="router-prop-button-group">
				<button onClick={handleClose} className="router-prop-button">Cancle</button>
				<button onClick={handleClose} className="router-prop-button">Save</button>
			</div>
		</div>
		</div>
	)
}


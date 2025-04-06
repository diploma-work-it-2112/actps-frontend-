import { useEffect, useRef } from "react";

export default function RouterPropertiesBlock({router, handleClose}){
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
				<p className="router-prop-f-value">{router.model_name}</p>
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
				<button onClick={handleClose} className="router-prop-button">Close</button>
				<button onClick={handleClose} className="router-prop-button">Edit</button>
			</div>
		</div>
		</div>
	)
}

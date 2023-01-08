import React from "react";

const Boxes = (props) => {
	const onClickHandler = (event) => {
		props.boxValueHandler({
			order: event.target.getAttribute("current_box_order"),
            //currentPlayer :
		});
	};
    let boxValue = '';
    let boxValueData = props.filledBoxes.filter((box_props) => props.order == box_props.order);
    if(boxValueData.length > 0)
    {
        boxValue = boxValueData[0].value;
    }

	const classes = "text-9xl flex justify-center items-center h-32 md:h-44 lg:h-52 border-white border-4 text-white cursor-pointer " + props.className;
	return (
		<div
			className={classes}
			onClick={onClickHandler}
			current_box_order={props.order}
		>
			{boxValue}
		</div>
	);
};

export default Boxes;

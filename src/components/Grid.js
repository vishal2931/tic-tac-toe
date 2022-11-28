import React, { useEffect, useState } from "react";
import Boxes from "./Boxes";

const Grid = (props) => {
	let boxes = [];
	const player1 = "O"; // User
	const player2 = "X"; // Bot

	for (let i = 1; i <= 9; i++) {
		boxes[i] = { id: "box-" + i, order: i };
	}

	const [filledBoxes, setFilledBoxes] = useState([]);
	const [checkClick, setNextClickValue] = useState("player1");

	const getBoxValueHandler = (boxValue) => {
		let clickedPlayer = getClickedPlayer(checkClick);
		if (checkClick == "player1") {
			setNextClickValue((prevData) => {
				return "player2";
			});
		} else {
			setNextClickValue((prevData) => {
				return "player1";
			});
		}
		setFilledBoxes((prevData) => {
			return [
				{ order: boxValue.order, value: clickedPlayer },
				...prevData,
			];
		});
	};

	//useEffect(() => console.log("test", checkClick), [checkClick]);
	useEffect(() => executeBotMove(), [filledBoxes]);

	const getClickedPlayer = (data) => {
		return data == "player1" ? player1 : player2;
	};

	const executeBotMove = (dataProps) => {
        
        if(checkClick == 'player2')
        {
            let filledBoxesOrders = filledBoxes.map((data) => { return parseInt(data.order);  });
            let emptyBoxes = boxes.filter(value => !filledBoxesOrders.includes(value.order));
            var emptyBox = emptyBoxes[Math.floor(Math.random()*emptyBoxes.length)];
            setTimeout(() => {
                setNextClickValue((prevData) => { return "player1"; });
                setFilledBoxes((prevData) => {
                    return [
                        { order: emptyBox.order, value: getClickedPlayer('player2') },
                        ...prevData,
                    ];
                });
                
            }, 500);
        }
	};

	return (
		<div className="bg-slate-900">
			<div className="mx-auto w-2/4 h-screen flex items-center">
				<div className="grid grid-cols-3 w-full">
					{boxes.map((value) => (
						<Boxes
							className=""
							filledBoxes={filledBoxes}
							key={value.id}
							order={value.order}
							boxValueHandler={getBoxValueHandler}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Grid;

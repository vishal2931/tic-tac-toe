import React, { useEffect, useState } from "react";
import Boxes from "./Boxes";

const Grid = (props) => {
	let boxes = [];
	const player1 = "O"; // User
	const player2 = "X"; // Bot
    const possibilities = [
        [1,2,3],
        [1,4,7],
        [7,8,9],
        [3,6,9],
        [4,5,6],
        [2,5,8],
        [1,5,9],
        [3,5,7]
    ]

	for (let i = 1; i <= 9; i++) {
		boxes[i] = { id: "box-" + i, order: i };
	}

	const [filledBoxes, setFilledBoxes] = useState([]);
	const [checkClick, setNextClickValue] = useState("player1");

	const getBoxValueHandler = (boxValue) => {
		let clickedPlayer = getClickedPlayer(checkClick);
		if (checkClick === "player1") {
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

	useEffect(() => executeBotMove(), [filledBoxes]);

	const getClickedPlayer = (data) => {
		return data === "player1" ? player1 : player2;
	};

	const executeBotMove = (dataProps) => {
        

        if(filledBoxes.length > 0)
        {
            let player1boxes = filledBoxes.filter(value => value.value === player1).map((data) => { return parseInt(data.order);  });
            let player2boxes = filledBoxes.filter(value => value.value === player2).map((data) => { return parseInt(data.order);  });
            if(player1boxes.length >= 3)
            {
                var is_winning = possibilities.map((value) => {

                    let filteredArray = value.filter(function(obj) { 
                        return player1boxes.indexOf(obj) !== -1; 
                    });

                    if(filteredArray.length === 3)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }).filter(v => v);

                if(is_winning.length > 0)
                {
                    setFilledBoxes((prevData) => {
                        return [];
                    });
                    setNextClickValue((prevData) => {
                        return "player1";
                    });
                    alert('YOU WIN');
                    return;
                }
            }
            
            if(player2boxes.length >= 3)
            {
                let is_winning = possibilities.map((value) => {

                    let filteredArray = value.filter(function(obj) { 
                        return player2boxes.indexOf(obj) !== -1; 
                    });

                    if(filteredArray.length === 3)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }).filter(v => v);

                if(is_winning.length > 0)
                {
                    setFilledBoxes((prevData) => {
                        return [];
                    });
                    setNextClickValue((prevData) => {
                        return "player1";
                    });
                    alert('BOT WIN');
                    return;
                }
            }
            if(checkClick === 'player2')
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
        }

	};

	return (
		<div className="bg-slate-900">
			<div className="mx-auto md:w-2/4 h-screen flex items-center w-11/12">
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

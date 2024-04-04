var json_data = {
	"peopleInLine": [[0, 0], [1, 2]] ,
	"itemQuantity": [[2, 5, 3], [0, 4, 9]]

};
console.log(json_data)

const data = JSON.stringify(json_data);

const blob = new Blob([data], { type: "application/json" });
const jsonObjectUrl = URL.createObjectURL(blob);

const filename = "tipping_game_json.json";
const anchorEl = document.createElement("a");
anchorEl.href = jsonObjectUrl;
anchorEl.download = filename;

anchorEl.click();

URL.revokeObjectURL(jsonObjectUrl);
class Online_Player extends PlayerBase {
    constructor(x, y, name, color) {
        super(x, y, name, color);
    }

    create() {
        var Player = database.ref('Players/' + this.id + "/");

        Player.on("value", (PlayerData) => {
            var PlayerDataVal = PlayerData.val();
            this.x = PlayerDataVal.x_pos;
            this.y = PlayerDataVal.y_pos;
        });
    }

    live() {
        this.display()
    }
}
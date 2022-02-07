class Player extends PlayerBase {
    constructor(x, y, name, color) {
        super(x, y, name, color);
        this.moveSpeed = 10;
        this.id = this.#createID();
        this.ref = "Players/" + this.id + "/";
    }

    //#region Private functions
    
    //#region System Functions

    #createID() {
        var id = "";
        for (var i in this.name) {
            id += this.name[i] + Math.round(Math.random());
        }
        console.log(id);
        return id;
    }

    #time() {
        return Date.now();
    }    

    //#endregion

    //#region Player functions

    #move() {
        if (keyIsDown(UP_ARROW)) {
            this.y += -this.moveSpeed;
        }
        else if (keyIsDown(RIGHT_ARROW)) {
            this.x += this.moveSpeed;
        }
        else if (keyIsDown(LEFT_ARROW)) {
            this.x += -this.moveSpeed;
        }
        else if (keyIsDown(DOWN_ARROW)) {
            this.y += this.moveSpeed;
        }
        this.#updatePosition()
    }
    
    #collideWithEnvironment(){
        
    }

    //#endregion

    //#endregion

    //#region Database

    async RegisterPlayer() {
        alert("You are online with player id " + this.id);
        await database.ref(this.ref).set({
            name: this.name,
            x_pos: this.x,
            y_pos: this.y,
            color: this.color,
            last_upt_time: this.#time()
        });

        var ref = database.ref("Game/");
        var colors = [];
        var playerOnline = 0;

        await ref.once("value", (data) => {
            colors = toString(data.val().used_colors).split(",");
            playerOnline = parseInt(data.val().Players_Online);
        });

        colors.push(this.color);
        playerOnline += 1;
        var colorstr = "";
        for (const i in colors) {
            colorstr += colors[i];
            if (i != (colors.length - 1)) {
                colorstr += ",";
            }
        }

        await database.ref("Game/").update({
            used_colors: colorstr,
            Players_Online: playerOnline
        });
    }

    async #updatePosition() {
        await database.ref(this.ref).update({
            x_pos: this.x,
            y_pos: this.y,
            color: this.color,
            name: this.name,
            last_upt_time: this.#time()
        });
    }
    //#endregion

    //#region Public Functions

    live() {
        this.#move();
        this.display();
        this.#collideWithEnvironment();
    }
    //#endregion
}
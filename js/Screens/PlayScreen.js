class PlayScreen {
    constructor() {        
        this.Quit_Button = createButton('Quit');        
    }

    toggleHide(){
        this.Quit_Button.hide()     
    }
    #display() {
        this.Quit_Button.position(560, 500);
        this.Quit_Button.style('width', '200px');
        this.Quit_Button.style('height', '40px');
        this.Quit_Button.style('background', 'lightpink');
    }

    #run() {        
        this.Quit_Button.mousePressed(() => {            
            game.quit();
        });
    }

    live() {
        this.#display();
        this.#run();
    }
}
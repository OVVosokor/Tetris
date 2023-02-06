window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
    canvasApp();
}

function canvasSupport () {
    return Modernizr.canvas;
}

function canvasApp()  {

    if ( !canvasSupport() ) {
        return;
    }

        const canvasStage = document.getElementById('myCanvas_stage');
        const ctxStage = canvasStage.getContext('2d');

        const canvasUI = document.getElementById('myCanvas_ui');
        const ctxUI = canvasUI.getContext('2d');

        const canvasBG = document.getElementById('myCanvas_bg');
        const ctxBG = canvasBG.getContext('2d');

        const canvasSideUI = document.getElementById('myCanvas_side_ui');
        const ctxSideUI = canvasSideUI.getContext('2d');

        const canvasStageLogical = document.getElementById('myCanvas_stage_logical');
        const ctxStageLogic = canvasStageLogical.getContext('2d');

        const canvasSideUILogical = document.getElementById('myCanvas_side_ui_logical');
        const ctxSideUILogic = canvasSideUILogical.getContext('2d');

        const canvasNextStage = document.getElementById('myCanvas_next_stage');
        const ctxNextStage = canvasNextStage.getContext('2d');

    let mouseClickCoords = {
        x: 0,
        y: 0
    };
/*
    let mouseClickSideCoords = {
        x: 0,
        y: 0
    };
    let mouseClickSideLogicCoords = {
        x: 0,
        y: 0
    };
    let mouseClickStageLogicCoords = {
        x: 0,
        y: 0
    };*/


    class Game {
        coords = {
            x: 0,
            y: 0
        };
        size = {
            width: 400,
            height: 540
        };
        buttonDrop = new Path2D();
        buttonRotate = new Path2D();
        buttonLeft = new Path2D();
        buttonRight = new Path2D();
        buttonDown = new Path2D();
        buttonStart = new Path2D();
        buttonReset = new Path2D();
        buttonPause = new Path2D();
        arrLogicalCells = [];
        arrLogicalCellsNextBox = [];
        arrCurrentNextBoxes = [];
        arrCurrentStageBoxes = [];
        arrStageBoxes = [];
        arrGameOverBoxes = [];
        currentStageElement = {
            boxes: [],
            type: '',
            typeName: ''
        };
        currentNextElement = {
            boxes: [],
            type: '',
            typeName: ''
        };

        typeI = {
            typeName: 'typeI',
            x1: 0,
            y1: 0,
            x2: 21,
            y2: 0,
            x3: 42,
            y3: 0,
            x4: 63,
            y4: 0,
            rotate: {
                dx1: 21,
                dy1: -42,
                dx2: 0,
                dy2: -21,
                dx3: -21,
                dy3: 0,
                dx4: -42,
                dy4: 21
            }
        };
        typeO = {
            typeName: 'typeO',
            x1: 0,
            y1: 0,
            x2: 21,
            y2: 0,
            x3: 0,
            y3: 21,
            x4: 21,
            y4: 21,
            rotate: {
                dx1: 0,
                dy1: 0,
                dx2: 0,
                dy2: 0,
                dx3: 0,
                dy3: 0,
                dx4: 0,
                dy4: 0
            }
        };
        typeS = {
            typeName: 'typeS',
            x1: 21,
            y1: 0,
            x2: 42,
            y2: 0,
            x3: 0,
            y3: 21,
            x4: 21,
            y4: 21,
            rotate: {
                dx1: 0,
                dy1: 0,
                dx2: -21,
                dy2: 21,
                dx3: 0,
                dy3: -42,
                dx4: -21,
                dy4: -21
            }
        };
        typeZ = {
            typeName: 'typeZ',
            x1: 0,
            y1: 0,
            x2: 21,
            y2: 0,
            x3: 21,
            y3: 21,
            x4: 42,
            y4: 21,
            rotate: {
                dx1: 42,
                dy1: -21,
                dx2: 21,
                dy2: 0,
                dx3: 0,
                dy3: -21,
                dx4: -21,
                dy4: 0
            }
        };
        typeL = {
            typeName: 'typeL',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 21,
            x3: 0,
            y3: 42,
            x4: 21,
            y4: 42,
            rotate: {
                bottom: {
                    dx1: 21,
                    dy1: 21,
                    dx2: 0,
                    dy2: 0,
                    dx3: -21,
                    dy3: -21,
                    dx4: -42,
                    dy4: 0
                },
                left: {
                    dx1: -21,
                    dy1: 21,
                    dx2: 0,
                    dy2: 0,
                    dx3: 21,
                    dy3: -21,
                    dx4: 0,
                    dy4: -42
                },
                top: {
                    dx1: -21,
                    dy1: -21,
                    dx2: 0,
                    dy2: 0,
                    dx3: 21,
                    dy3: 21,
                    dx4: 42,
                    dy4: 0
                },
                right: {
                    dx1: 21,
                    dy1: -21,
                    dx2: 0,
                    dy2: 0,
                    dx3: -21,
                    dy3: 21,
                    dx4: 0,
                    dy4: 42
                }
            }
        };
        typeJ = {
            typeName: 'typeJ',
            x1: 21,
            y1: 0,
            x2: 21,
            y2: 21,
            x3: 21,
            y3: 42,
            x4: 0,
            y4: 42,
            rotate: {
                bottom: {
                    dx1: 21,
                    dy1: 21,
                    dx2: 0,
                    dy2: 0,
                    dx3: -21,
                    dy3: -21,
                    dx4: 0,
                    dy4: -42
                },
                left: {
                    dx1: -21,
                    dy1: 21,
                    dx2: 0,
                    dy2: 0,
                    dx3: 21,
                    dy3: -21,
                    dx4: 42,
                    dy4: 0
                },
                top: {
                    dx1: -21,
                    dy1: -21,
                    dx2: 0,
                    dy2: 0,
                    dx3: 21,
                    dy3: 21,
                    dx4: 0,
                    dy4: 42
                },
                right: {
                    dx1: 21,
                    dy1: -21,
                    dx2: 0,
                    dy2: 0,
                    dx3: -21,
                    dy3: 21,
                    dx4: -42,
                    dy4: 0
                }
            }
        };
        typeT = {
            typeName: 'typeT',
            x1: 0,
            y1: 0,
            x2: 21,
            y2: 0,
            x3: 42,
            y3: 0,
            x4: 21,
            y4: 21,
            rotate: {
                bottom: {
                    dx1: 21,
                    dy1: -21,
                    dx2: 0,
                    dy2: 0,
                    dx3: -21,
                    dy3: 21,
                    dx4: -21,
                    dy4: -21
                },
                left: {
                    dx1: 21,
                    dy1: 21,
                    dx2: 0,
                    dy2: 0,
                    dx3: -21,
                    dy3: -21,
                    dx4: 21,
                    dy4: -21
                },
                top: {
                    dx1: -21,
                    dy1: 21,
                    dx2: 0,
                    dy2: 0,
                    dx3: 21,
                    dy3: -21,
                    dx4: 21,
                    dy4: 21
                },
                right: {
                    dx1: -21,
                    dy1: -21,
                    dx2: 0,
                    dy2: 0,
                    dx3: 21,
                    dy3: 21,
                    dx4: -21,
                    dy4: 21
                }
            }
        };
        
        #defaultSpeed = 0.125;
        #speed = this.#defaultSpeed; //0.125
        #deltaTimer = 60;
        #deltaSpeed = 0.125;

        score = 0;
        highScore = 0;

        isPressDrop = false;
        isPressLeft = false;
        isPressRight = false;
        isPressRotate = false;
        isPressDown = false;
        isPressStart = false;
        isPressReset = false;
        isPressPause = false;

        isInitDraw = false;
        isRedrawUI = true;
        isRedrawSideUI = true;
        isDrawLogicalMeshUI = false;
        isDrawLogicalMeshStage = false;
        isCreateElement = false; //default - false
        isPlayTheGame = false;
        isGamePaused = false;
        isGameReset = false;
        isGameOver = false;
        isCollide = false;
        isElementDown = false;
        isElementLeft = false;
        isElementRight = false;
        isElementDrop = false;
        isElementRotate = false;
        #pauseStart = undefined;

        //startUp
        init() {
            {   //stage
                for ( let row = 0; row < 20; row++ ) {
                    this.arrLogicalCells[row] = [];
                    for ( let col = 0; col < 10; col++ ) {
                        this.arrLogicalCells[row][col] = new LogicalCell( 'cellStage' );
                    }
                }
                //set coords.y
                let counterY = 0;
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        this.arrLogicalCells[row][col].coords.y += (21 * counterY);
                    }
                    counterY++;
                }
                //set coords.x
                let counterX = 0;
                for ( let col = 0; col < 10; col++ ) {
                    for ( let row = 0; row < 20; row++ ) {
                        this.arrLogicalCells[row][col].coords.x += (21 * counterX);
                    }
                    counterX++;
                }
                //console.log( this.arrLogicalCells );
            }
            {   //Next Box
                for ( let row = 0; row < 8; row++ ) {
                    this.arrLogicalCellsNextBox[row] = []// new LogicalCell( 'cellNextBox' );
                    for ( let col = 0; col < 8; col++ ) {
                        this.arrLogicalCellsNextBox[row][col] = new LogicalCell( 'cellNextBox' );
                    }
                }
                //set coords.y
                let counterY = 0;
                for ( let row = 0; row < 8; row++ ) {
                    for ( let col = 0; col < 8; col++ ) {
                        this.arrLogicalCellsNextBox[row][col].coordsScale.y += (21 * counterY);
                    }
                    counterY++;
                }
                //set coords.x
                let counterX = 0;
                for ( let col = 0; col < 8; col++ ) {
                    for ( let row = 0; row < 8; row++ ) {
                        this.arrLogicalCellsNextBox[row][col].coordsScale.x += (21 * counterX);
                    }
                    counterX++;
                }
                //console.log( this.arrLogicalCellsNextBox );
            }
            { //arrStageBoxes
                for ( let row = 0; row < 20; row++ ) {
                    this.arrStageBoxes[row] = [];
                    for ( let col = 0; col < 10; col++ ) {
                        this.arrStageBoxes[row][col];
                    }
                }
            }
            { //arrGameOverBoxes
                for ( let row = 0; row < 20; row++ ) {
                    this.arrGameOverBoxes[row] = [];
                    for ( let col = 0; col < 10; col++ ) {
                        this.arrGameOverBoxes[row][col];
                    }
                }
            }
            gameLoop();
        }
        //starts Demo load
        startGame() {
            if ( this.isPressStart && !this.isPlayTheGame ) {
                let arrElements = [];
                const delay = 100;
                for ( let row = 0; row < 20; row++ ) {
                    arrElements[row] = [];
                    for ( let col = 0; col < 10; col++ ) {
                        arrElements[row][col] = new Box( 'stageBox' );
                        arrElements[row][col].coords.x = this.arrLogicalCells[row][col].coords.x;
                        arrElements[row][col].coords.y = this.arrLogicalCells[row][col].coords.y;
                    }
                }
                //console.log( arrElements );
                //интервал для задержки рисования
                let startIndexToTop = 20;
                let startIndexToBottom = 0;
                let timer = setInterval( () => {
                    if ( startIndexToTop !== 0 ) {
                        startIndexToTop--;
                        for ( let i = 0; i < 10; i++ ) {
                            arrElements[startIndexToTop][i].drawBox();
                        }
                    }else
                        if ( startIndexToTop === 0 ) {
                            if ( startIndexToBottom >= 0  && startIndexToBottom < 20 ) {
                                for ( let i = 0; i < 10; i++ ) {
                                    arrElements[startIndexToBottom][i].clearBox();
                                }
                                startIndexToBottom++;

                            }else
                                if ( startIndexToBottom === 20 ) {
                                    setTimeout( () => {
                                        this.isPlayTheGame = true;
                                        if ( this.isGameReset ) {
                                            this.isGameReset = false;
                                        }
                                    }, 500 );
                                    clearInterval( timer );
                                }
                        }
                }, delay );

            }
        }
        //таймер для смены скорости
        timerForChangeSpeed( deltaTimer ) {
            if ( this.isPlayTheGame && !this.isGameOver && !this.isGamePaused ) {
                let delta;

                if ( this.#pauseStart !== undefined ) {
                    const pauseEnd = new Date().getTime();
                    delta =  Math.round( ( pauseEnd - this.#pauseStart ) / 1000 ) ;
                    //console.log( pauseEnd );
                }

                if ( this.#pauseStart === undefined ) {
                    this.#pauseStart = new Date().getTime(); //старт функции
                }   
                //console.log( delta, this.#pauseStart );
                if ( delta === deltaTimer ) {
                    this.#pauseStart = undefined;
                    //this.#defaultSpeed += 0.125;
                    this.#speed += this.#deltaSpeed;
                    this.isRedrawSideUI = true;
                }
            }
        }
        //фон
        drawBackGround() {
            if ( !this.isInitDraw ) {
                ctxBG.drawImage( imageBG, this.coords.x, this.coords.y, canvasBG.width, canvasBG.height );
                ctxBG.drawImage( imageStage, this.coords.x + 115, this.coords.y, canvasStage.width+1, canvasStage.height );

                ctxBG.font = "20px Sans";
                ctxBG.fillStyle = 'black';
                ctxBG.fillText( 'Next', this.coords.x + 375, this.coords.y + 30 );
                ctxBG.lineWidth = 2 
                ctxBG.rect( this.coords.x + 350+2, this.coords.y + 30+3, 92, 92 );

                ctxBG.font = "16px Sans";
                ctxBG.fillText( 'Score', this.coords.x + 375, this.coords.y + 140 );
                ctxBG.rect(  this.coords.x + 355, this.coords.y + 151, 80, 20 );

                ctxBG.fillText( 'High Score', this.coords.x + 357, this.coords.y + 220 );
                ctxBG.rect(  this.coords.x + 355, this.coords.y + 230, 80, 20 );

                ctxBG.fillText( 'Speed', this.coords.x + 375, this.coords.y + 280 );
                ctxBG.rect(  this.coords.x + 375, this.coords.y + 290, 40, 20 );

                ctxBG.stroke();

                this.isInitDraw = true;
            }
        }
        //рисуем сбоку элементы
        drawSideUI() {
            if ( this.isRedrawSideUI ) {
                ctxSideUI.clearRect( 0, 0, canvasSideUI.width, canvasSideUI.height ); //TODO изменить размеры стирания поставить под каждый блок
                { //добавляю в вывод по индексам очки score
                    let a = ['0','0','0','0','0','0','0'];
                    let score = String(this.score);
                    let splitScore = score.split('');
                    let dLength = a.length - splitScore.length;

                    if ( splitScore.length < a.length ) {
                        for ( let i = 0; i < dLength; i++ ) {
                            splitScore.unshift('0');
                        }
                    }
                    for ( let i = 0; i < a.length; i++ ) {
                        a[i] = splitScore[i];
                        //console.log( a[i] );
                    }
                    ctxSideUI.font = "normal bold 20px Inconsolata";
                    ctxSideUI.fillText( `${ a[0] }${ a[1] }${ a[2] }${ a[3] }${ a[4] }${ a[5] }${ a[6] }`, this.coords.x + 10, this.coords.y + 168 );
                }
                { //добавляю в вывод по индексам очки highScore
                    let b = ['0','0','0','0','0','0','0'];
                    let highScore = String(this.highScore);
                    let splitHighScore = highScore.split('');
                    let dHighLength = b.length - splitHighScore.length;

                    if ( splitHighScore.length < b.length ) {
                        for ( let i = 0; i < dHighLength; i++ ) {
                            splitHighScore.unshift('0');
                        }
                    }
                    for ( let i = 0; i < b.length; i++ ) {
                        b[i] = splitHighScore[i];
                        //console.log( a[i] );
                    }
                    
                    ctxSideUI.fillText( `${ b[0] }${ b[1] }${ b[2] }${ b[3] }${ b[4] }${ b[5] }${ b[6] }`, this.coords.x + 10, this.coords.y + 247 );
                }

                let s = this.#speed * 8;
                if ( s >= 10 ) {
                    ctxSideUI.fillText( `${ s }`, this.coords.x + 35, this.coords.y + 307 );
                }else{
                    ctxSideUI.fillText( `${ s }`, this.coords.x + 40, this.coords.y + 307 );
                }
                this.isRedrawSideUI = false;
            }
        }
        //рисуем кнопки
        drawUI() {
            if ( this.isRedrawUI ) {
                { //Drop
                    let posImage = 100;
                if ( !this.isPressDrop ) {
                    ctxUI.clearRect( this.coords.x + 40, this.coords.y + 18, 80, 100 )
                    ctxUI.drawImage( imageButtonBig, posImage, 0, 100, 100, this.coords.x + 40, this.coords.y + 35, 80, 80 );
                }else
                    if( this.isPressDrop ) {
                        ctxUI.clearRect( this.coords.x + 40, this.coords.y + 18, 80, 100 )
                        posImage -= 102;
                        ctxUI.drawImage( imageButtonBig, posImage, 0, 100, 100, this.coords.x + 40, this.coords.y + 35, 80, 80 );
                        this.isPressDrop = false;
                        //замедление отжатия кнопки
                        setTimeout( () => {
                            this.isRedrawUI = true;
                        }, 100 );
                    }
                    ctxUI.strokeText( 'Drop', this.coords.x + 70, this.coords.y + 30 );
                }

                let posImage = 50;

                //Left
                if ( !this.isPressLeft ) {
                    ctxUI.clearRect( 169, 0, canvasUI.width, canvasUI.height )
                    ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 190, this.coords.y + 50, 50, 50 );
                }else
                    if ( this.isPressLeft ) {
                        posImage -= 51;
                        ctxUI.clearRect( 169, 0, canvasUI.width, canvasUI.height )

                        ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 190, this.coords.y + 50, 50, 50 );
                        this.isPressLeft = false;
                        //замедление отжатия кнопки
                        setTimeout( () => {
                            this.isRedrawUI = true;
                        }, 100 );
                        posImage = 50;
                    }
                //Right
                if ( !this.isPressRight ) {
                    ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 270, this.coords.y + 50, 50, 50 );
                }else
                    if ( this.isPressRight ) {
                        posImage -= 51;
                        ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 270, this.coords.y + 50, 50, 50 );
                        this.isPressRight = false;
                        //замедление отжатия кнопки
                        setTimeout( () => {
                            this.isRedrawUI = true;
                        }, 100 );
                        posImage = 50;

                    }
                //Rotate
                if ( !this.isPressRotate ) {
                    ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 230, this.coords.y + 10, 50, 50 );
                }else
                    if ( this.isPressRotate ) {
                        posImage -= 51;
                        ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 230, this.coords.y + 10, 50, 50 );
                        this.isPressRotate = false;
                        //замедление отжатия кнопки
                        setTimeout( () => {
                            this.isRedrawUI = true;
                        }, 100 );
                        posImage = 50;

                    }
                //Down
                if ( !this.isPressDown ) {
                    ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 230, this.coords.y + 90, 50, 50 );
                }else
                    if ( this.isPressDown ) {
                        posImage -= 51;
                        ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 230, this.coords.y + 90, 50, 50 );
                        this.isPressDown = false;
                        //замедление отжатия кнопки
                        setTimeout( () => {
                            this.isRedrawUI = true;
                        }, 100 );
                        posImage = 50;
                    }
                //Start
                if ( !this.isPressStart ) {
                    ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 360, this.coords.y + 15, 25, 25 );
                }else
                    if ( this.isPressStart ) {
                        posImage -= 51;
                        ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 360, this.coords.y + 15, 25, 25 );
                        this.isPressStart = false;
                        //замедление отжатия кнопки
                        setTimeout( () => {
                            this.isRedrawUI = true;
                        }, 100 );
                        posImage = 50;
                    }
                //Reset
                if ( !this.isPressReset ) {
                    ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 360, this.coords.y + 50, 25, 25 );
                }else
                    if ( this.isPressReset ) {
                        posImage -= 51;
                        ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 360, this.coords.y + 50, 25, 25 );
                        this.isPressReset = false;
                        setTimeout( () => {
                            this.isRedrawUI = true;
                        }, 100 );
                        posImage = 50;
                    }
                //Pause
                if ( !this.isPressPause ) {
                    ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 360, this.coords.y + 85, 25, 25 );
                }else
                    if ( this.isPressPause ) {
                        posImage -= 51;
                        ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 360, this.coords.y + 85, 25, 25 );
                        this.isPressPause = false;
                        setTimeout( () => {
                            this.isRedrawUI = true;
                        }, 100 );
                        posImage = 50;
                    }
                ctxUI.strokeText( 'Reset', this.coords.x + 362, this.coords.y + 47 );
                ctxUI.strokeText( 'Left', this.coords.x + 173, this.coords.y + 75 );
                ctxUI.strokeText( 'Right', this.coords.x + 320, this.coords.y + 75 );
                ctxUI.strokeText( 'Rotate', this.coords.x + 241, this.coords.y + 66 );
                ctxUI.strokeText( 'Down', this.coords.x + 242, this.coords.y + 86 );
                ctxUI.strokeText( 'Start', this.coords.x + 362, this.coords.y + 10 );
                ctxUI.strokeText( 'Pause', this.coords.x + 362, this.coords.y + 84 );

                this.isRedrawUI = false;
            }
        }
        //рисуем логические сетки
        drawLogicalMeshStage() {
            if ( !this.isDrawLogicalMeshStage ) {
                //ctxStage.clearRect( 0, 0, ctxStage.width, ctxStage.height );
                //stage
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        this.arrLogicalCells[row][col].drawCell();
                    }
                }
                //NextBox
                for ( let row = 0; row < 8; row++ ) {
                    for ( let col = 0; col < 8; col++ ) {
                        this.arrLogicalCellsNextBox[row][col].drawCell();
                    }
                }
                this.isDrawLogicalMeshStage = true;
            }
        }
        drawLogicalMeshUi() {
            if ( !this.isDrawLogicalMeshUI ) {
                ctxUI.fillStyle = '#ffffff00';

                //drop
                this.buttonDrop.arc( this.coords.x + 80, this.coords.y + 73, 31, 0, 2 * Math.PI );
                ctxUI.fill( this.buttonDrop );
                //Left
                this.buttonLeft.arc( this.coords.x + 215, this.coords.y + 73, 19, 0, 2 * Math.PI );
                ctxUI.fill( this.buttonLeft );
                //Right
                this.buttonRight.arc( this.coords.x + 295, this.coords.y + 73, 19, 0, 2 * Math.PI );
                ctxUI.fill( this.buttonRight );
                //Rotate
                this.buttonRotate.arc( this.coords.x + 255, this.coords.y + 33, 19, 0, 2 * Math.PI );
                ctxUI.fill( this.buttonRotate );
                //Down
                this.buttonDown.arc( this.coords.x + 255, this.coords.y + 113, 19, 0, 2 * Math.PI );
                ctxUI.fill( this.buttonDown );
                //Start
                this.buttonStart.arc( this.coords.x + 372, this.coords.y + 27, 10, 0, 2 * Math.PI );
                ctxUI.fill( this.buttonStart );
                //Reset
                this.buttonReset.arc( this.coords.x + 372, this.coords.y + 62, 10, 0, 2 * Math.PI );
                ctxUI.fill( this.buttonReset );
                //Pause
                this.buttonPause.arc( this.coords.x + 372, this.coords.y + 97, 10, 0, 2 * Math.PI );
                ctxUI.fill( this.buttonPause );
                

                this.isDrawLogicalMesh = true;
            }
        }
        //проверка на нажатия кнопок мышью
        checkPressButtons() {
            if ( ctxUI.isPointInPath( this.buttonDrop, mouseClickCoords.x, mouseClickCoords.y ) ) {
                console.log('Drop');
                if ( !this.isElementDrop && this.isPlayTheGame ) {
                    this.isElementDrop = true;
                }
                this.isPressDrop = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonLeft, mouseClickCoords.x, mouseClickCoords.y ) ) {
                console.log('Left');
                if ( !this.isElementLeft && this.isPlayTheGame ) {
                    this.isElementLeft = true;
                }
                this.isPressLeft = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonRight, mouseClickCoords.x, mouseClickCoords.y ) ) {
                console.log('Right');
                if ( !this.isElementRight && this.isPlayTheGame ) {
                    this.isElementRight = true;
                }
                this.isPressRight = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonRotate, mouseClickCoords.x, mouseClickCoords.y ) ) {
                console.log('Rotate');
                if ( !this.isElementRotate && this.isPlayTheGame ) {
                    this.isElementRotate = true;
                }
                this.isPressRotate = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonDown, mouseClickCoords.x, mouseClickCoords.y ) ) {
                console.log('Down');
                if ( !this.isElementDown && this.isPlayTheGame ) {
                    this.isElementDown = true;
                }
                this.isPressDown = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonStart, mouseClickCoords.x, mouseClickCoords.y ) ) {
                console.log('Start');
                this.isPressStart = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonReset, mouseClickCoords.x, mouseClickCoords.y ) ) {
                console.log('Reset');
                if ( !this.isGameReset && this.isPlayTheGame ) {
                    this.isGameReset = true;
                }
                this.isPressReset = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonPause, mouseClickCoords.x, mouseClickCoords.y ) && !this.isGameOver ) {
                console.log( 'Pause' );
                if ( !this.isGamePaused && this.isPlayTheGame ) {
                    this.isGamePaused = true;
                }else
                    if ( this.isGamePaused && this.isPlayTheGame ) {
                        this.isGamePaused = false;
                    }
                this.isPressPause = true;
                this.isRedrawUI = true;
            }

            if ( mouseClickCoords.x !== undefined && mouseClickCoords.y !== undefined ) {
                mouseClickCoords.x = undefined;
                mouseClickCoords.y = undefined;
            }
            /*
            if ( mouseClickCoords.x !== undefined && mouseClickCoords.y !== undefined ) {
                mouseClickCoords.x = undefined;
                mouseClickCoords.y = undefined;
            }
            if ( mouseClickSideCoords.x !== undefined && mouseClickSideCoords.y !== undefined ) {
                mouseClickSideCoords.x = undefined;
                mouseClickSideCoords.y = undefined;
            }
            if ( mouseClickSideLogicCoords.x !== undefined && mouseClickSideLogicCoords.y !== undefined ) {
                mouseClickSideLogicCoords.x = undefined;
                mouseClickSideLogicCoords.y = undefined;
            }
            if ( mouseClickStageLogicCoords.x !== undefined && mouseClickStageLogicCoords.y !== undefined ) {
                mouseClickStageLogicCoords.x = undefined;
                mouseClickStageLogicCoords.y = undefined;
            }*/

            
        }
        /*
        test() {
            //stage
            if ( mouseClickStageLogicCoords.x !== undefined ) {
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        if ( ctxStageLogic.isPointInPath( this.arrLogicalCells[row][col].path, mouseClickStageLogicCoords.x, mouseClickStageLogicCoords.y ) ) {
                            console.log( 'Stage id=', this.arrLogicalCells[row][col].id, 'x=', this.arrLogicalCells[row][col].coords.x, 'y=', this.arrLogicalCells[row][col].coords.y );
                        }
                    }
                }
            }
            //NextBox
            if ( mouseClickSideLogicCoords.x !== undefined ) {
                for ( let row = 0; row < 8; row++ ) {
                    for ( let col = 0; col < 8; col++ ) {
                        if ( ctxSideUILogic.isPointInPath( this.arrLogicalCellsNextBox[row][col].path, mouseClickSideLogicCoords.x, mouseClickSideLogicCoords.y ) ) {
                            console.log( 'Next id=', this.arrLogicalCellsNextBox[row][col].idNextBox, 'x=', this.arrLogicalCellsNextBox[row][col].coordsScale.x, 'y=', this.arrLogicalCellsNextBox[row][col].coordsScale.y );
                        }
                    }
                }
            }

        }*/
        //выбираем блок
        getTypeElement() {
                const typeElements = [ this.typeI, this.typeJ, this.typeL, this.typeO, this.typeS, this.typeT, this.typeZ ];
                let result;
                let index = Math.floor( Math.random() *  ( typeElements.length - 1 ) );
                result = typeElements[ index ];

                return result ;
        }
        //создание элемента
        createElement( mode, typeElement ) {

            let startPosition;
            startPosition = game.arrLogicalCells[2][3];

            //'stageBox'
            if ( mode === 'stageBox' ) {
                for ( let i = 0; i < 4; i++ ) {
                    this.arrCurrentStageBoxes[i] = new Box( mode ); 
                }
            }
            
            //'NextBox'
            if ( mode === 'NextBox' ) {
                startPosition = game.arrLogicalCellsNextBox[3][2];
                for ( let i = 0; i < 4; i++ ) {
                    this.arrCurrentNextBoxes[i] = new Box( mode ); 
                }
            }

           // console.log( this.arrCurrentNextBoxes );
            //console.log( this.arrCurrentStageBoxes );
            //присваиваем координаты
            for ( let i = 0; i < 4; i++ ) {
                let typeX = 0;
                let typeY = 0;
                switch ( i ) {
                    case 0:
                        typeX = typeElement.x1;
                        typeY = typeElement.y1;
                        break;
                    case 1:
                        typeX = typeElement.x2;
                        typeY = typeElement.y2;
                        break;
                    case 2:
                        typeX = typeElement.x3;
                        typeY = typeElement.y3;
                        break;
                    case 3:
                        typeX = typeElement.x4;
                        typeY = typeElement.y4;
                        break;
                    }
                if ( mode === 'NextBox' ) {
                    this.arrCurrentNextBoxes[i].coordsScale.x = startPosition.coordsScale.x + typeX;
                    this.arrCurrentNextBoxes[i].coordsScale.y = startPosition.coordsScale.y + typeY;
                }else
                    if ( mode === 'stageBox' ) {
                        this.arrCurrentStageBoxes[i].coords.x = startPosition.coords.x + typeX;
                        this.arrCurrentStageBoxes[i].coords.y = startPosition.coords.y + typeY;
                    }
            }

            if ( mode === 'NextBox' ) {
                this.currentNextElement.boxes = this.arrCurrentNextBoxes;
                this.currentNextElement.typeName = typeElement.typeName;
                this.currentNextElement.type = typeElement;
                //console.log( this.currentNextElement );
            }else
                if ( mode === 'stageBox' ) {
                    this.currentStageElement.boxes = this.arrCurrentStageBoxes;
                    this.currentStageElement.typeName = typeElement.typeName;
                    this.currentStageElement.type = typeElement;
                    //console.log( this.currentStageElement );
                }
        }
        createElements() {
            if ( this.isPlayTheGame && !this.isCreateElement && !this.isGameReset ) {
                let typeNext;
                let typeStage;
                if ( this.arrCurrentNextBoxes.length === 0 ) { //если не создавалось еще
                    typeNext = this.getTypeElement();
                    typeStage = this.getTypeElement();
                }else{
                    typeNext = this.getTypeElement();
                    typeStage = this.currentNextElement.type;
                }

                this.createElement( 'stageBox', typeStage ); //this.typeT
                this.createElement( 'NextBox', typeNext ); //this.typeJ

                this.isCreateElement = true;
            }
        }
        //обновление элемента
        updateElement() {
            if ( this.isPlayTheGame && this.isCreateElement && !this.isGameReset && !this.isGamePaused ) {
                let moveableFlag;

                for ( const box of this.arrCurrentStageBoxes ) {
                    if ( box.isMoveable ) {
                        moveableFlag = true;
                        break;
                    }
                }
                if ( moveableFlag ) {
                    this.rotateElement();
                    this.moveElement();
                    this.moveDownElement();
                    this.moveLeftElement();
                    this.moveRightElement();
                    this.moveDropElement();
                    this.testCollidings();
                }
            }
        }
        rotate( rotate, direction ) {
            for ( let i = 0; i < 4; i++ ) {
                let typeRotateX;
                let typeRotateY;
                //let k = 1;
                switch ( i ) {
                    case 0:
                        typeRotateX = rotate.dx1 * direction.k;
                        typeRotateY = rotate.dy1 * direction.k;
                        break;
                    case 1:
                        typeRotateX = rotate.dx2 * direction.k;
                        typeRotateY = rotate.dy2 * direction.k;
                        break;
                    case 2:
                        typeRotateX = rotate.dx3 * direction.k;
                        typeRotateY = rotate.dy3 * direction.k;
                        break;
                    case 3:
                        typeRotateX = rotate.dx4 * direction.k;
                        typeRotateY = rotate.dy4 * direction.k;
                        break;
                }
                this.arrCurrentStageBoxes[i].coords.x = this.arrCurrentStageBoxes[i].coords.x + typeRotateX;
                this.arrCurrentStageBoxes[i].coords.y = this.arrCurrentStageBoxes[i].coords.y + typeRotateY;
            }

        }
        rotateElement() {
            if ( this.isElementRotate ) {
                const delay = 100;
                
                for ( const element of this.arrCurrentStageBoxes ) {
                    element.clearBox();
                }

                //проверяем тип элемента
                let direction = {
                    k: undefined
                };

                if ( this.currentStageElement.typeName === 'typeI' ) {
                    { //находим положение - горизонтальное или вертикальное
                        let arrX = [];
                        let arrY = [];

                        for ( const element of this.arrCurrentStageBoxes ) {
                            arrX.push( element.coords.x );
                            arrY.push( element.coords.y );
                        }
                        if ( arrX[0] === arrX[1] && arrX[1] === arrX[2] && arrX[2] === arrX[3] ) {
                            direction.type = 'vertical';
                            direction.k = -1;
                        }else
                            if ( arrY[0] === arrY[1] && arrY[1] === arrY[2] && arrY[2] === arrY[3] ) {
                                direction.type = 'horizontal';
                                direction.k = 1;
                            }
                    }
                }else
                    if ( this.currentStageElement.typeName === 'typeS' ) {
                        { //находим положение - горизонтальное или вертикальное
                            let arrX = [];
                            let arrY = [];
    
                            for ( const element of this.arrCurrentStageBoxes ) {
                                arrX.push( element.coords.x );
                                arrY.push( element.coords.y );
                            }
                            if ( arrX[0] === arrX[3] ) {
                                direction.type = 'horizontal'; //vertical
                                direction.k = 1;
                            }else
                                if ( arrY[0] === arrY[3] ) {
                                    direction.type = 'vertical'; //horizontal
                                    direction.k = -1;
                                }
                        }
                    }else
                        if ( this.currentStageElement.typeName === 'typeO' ) {
                            direction.k = 1;
                        }else
                            if ( this.currentStageElement.typeName === 'typeZ' ) {
                                { //находим положение - горизонтальное или вертикальное
                                    let arrX = [];
                                    let arrY = [];
            
                                    for ( const element of this.arrCurrentStageBoxes ) {
                                        arrX.push( element.coords.x );
                                        arrY.push( element.coords.y );
                                    }
                                    if ( arrX[1] === arrX[2] ) {
                                        direction.type = 'horizontal'; //vertical
                                        direction.k = 1;
                                    }else
                                        if ( arrY[1] === arrY[2] ) {
                                            direction.type = 'vertical'; //horizontal
                                            direction.k = -1;
                                        }
                                }
                            }else
                                if ( this.currentStageElement.typeName === 'typeL' ) {
                                    { //находим положение 
                                        let arrX = [];
                                        let arrY = [];
                
                                        for ( const element of this.arrCurrentStageBoxes ) {
                                            arrX.push( element.coords.x );
                                            arrY.push( element.coords.y );
                                        }
                                        if ( arrX[0] === arrX[1] && arrY[2] === arrY[3] && arrX[2] < arrX[3] ) {
                                            direction.type = 'bottom'; 
                                        }else
                                            if ( arrY[0] === arrY[1] && arrX[2] === arrX[3] && arrY[3] > arrY[2] ) {
                                                direction.type = 'left'; 
                                            }else
                                                if ( arrY[2] === arrY[3] && arrX[0] === arrX[1] && arrX[2] > arrX[3] ) {
                                                    direction.type = 'top'; 
                                                }else
                                                    if ( arrY[0] === arrY[1] && arrX[2] === arrX[3] && arrY[3] < arrY[2] ) {
                                                        direction.type = 'right'; 
                                                    }
                                    }
                                }else
                                    if ( this.currentStageElement.typeName === 'typeJ' ) {
                                        { //находим положение
                                            let arrX = [];
                                            let arrY = [];
                    
                                            for ( const element of this.arrCurrentStageBoxes ) {
                                                arrX.push( element.coords.x );
                                                arrY.push( element.coords.y );
                                            }
                                            if ( arrX[0] === arrX[1] && arrY[2] === arrY[3] && arrX[2] > arrX[3] ) {
                                                direction.type = 'bottom'; 
                                            }else
                                                if ( arrY[0] === arrY[1] && arrX[2] === arrX[3] && arrY[3] < arrY[2] ) {
                                                    direction.type = 'left'; 
                                                }else
                                                    if ( arrY[2] === arrY[3] && arrX[0] === arrX[1] && arrX[2] < arrX[3] ) {
                                                        direction.type = 'top'; 
                                                    }else
                                                        if ( arrY[0] === arrY[1] && arrX[2] === arrX[3] && arrY[3] > arrY[2] ) {
                                                            direction.type = 'right'; 
                                                        }
                                                        //console.log( direction.type, this.arrCurrentStageBoxes );
                                        }
                                    }else
                                        if ( this.currentStageElement.typeName === 'typeT' ) {
                                            { //находим положение
                                                let arrX = [];
                                                let arrY = [];
                        
                                                for ( const element of this.arrCurrentStageBoxes ) {
                                                    arrX.push( element.coords.x );
                                                    arrY.push( element.coords.y );
                                                }
                                                if ( arrX[1] === arrX[3] && arrY[0] === arrY[2] && arrY[1] < arrY[3] ) {
                                                    direction.type = 'bottom'; 
                                                }else
                                                    if ( arrX[0] === arrX[2] && arrY[3] === arrY[1] && arrX[3] < arrX[1] ) {
                                                        direction.type = 'left'; 
                                                    }else
                                                        if ( arrY[0] === arrY[2] && arrX[3] === arrX[1] && arrY[3] < arrY[1] ) {
                                                            direction.type = 'top'; 
                                                        }else
                                                            if ( arrX[0] === arrX[2] && arrY[1] === arrY[3] && arrX[1] < arrX[3] ) {
                                                                direction.type = 'right'; 
                                                            }
                                                            //console.log( direction.type, this.arrCurrentStageBoxes );
                                            }
                                        }


                    if ( direction.k === undefined ) {
                        direction.k = 1;
                        switch ( direction.type ) {
                            case 'bottom':
                                this.rotate( this.currentStageElement.type.rotate.bottom, direction );
                                //console.log( this.currentStageElement.type.rotate.bottom );
                                break;
                            case 'left':
                                this.rotate( this.currentStageElement.type.rotate.left, direction );
                                //console.log( this.currentStageElement.type.rotate.left );
                                break;
                            case 'top':
                                this.rotate( this.currentStageElement.type.rotate.top, direction );
                                //console.log( this.currentStageElement.type.rotate.top );
                                break;
                            case 'right':
                                this.rotate( this.currentStageElement.type.rotate.right, direction );
                                //console.log( this.currentStageElement.type.rotate.right );
                                break;
    
                        }
                    }else
                        if ( direction.k !== undefined ) {
                            this.rotate( this.currentStageElement.type.rotate, direction );
                        }
                
                //console.log( this.currentStageElement.type.rotate );
                //поворот

                //пауза перед отрисовкой
                setTimeout( () => {
                    for ( const element of this.arrCurrentStageBoxes ) {
                        element.drawBox();
                    };
                    }, delay
                );
                this.isElementRotate = false;
            }
        }
        moveElement() {
                ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );
                for ( const box of this.arrCurrentStageBoxes ) {
                    box.coords.y += this.#speed;
                    box.drawBox();
                }
           // }
        }
        moveDownElement() {
            if ( this.isElementDown ) {
                this.#speed += 0.125;
                setTimeout( () => {
                    this.isElementDown = false;
                    this.#speed -= 0.125;
                }, 200 );
            }
        }
        moveLeftElement() {
            if ( this.isElementLeft ) {
                const offsetLeft = 21;
                for ( const box of this.arrCurrentStageBoxes ) {
                    box.coords.x -= offsetLeft;
                    box.drawBox();
                }
                this.isElementLeft = false;
            }
        }
        moveRightElement() {
            if ( this.isElementRight) {
                const offsetRight = 21;
                for ( const box of this.arrCurrentStageBoxes ) {
                    box.coords.x += offsetRight;
                    box.drawBox();
                }
                this.isElementRight = false;
            }
        }
        moveDropElement() {
            if ( this.isElementDrop ) {
                const dropSpeed = 3;
                this.#speed += dropSpeed; 
                
                setTimeout( () => {
                    this.isElementDrop = false;
                    this.#speed -= dropSpeed;
                }, 300 );
            }
        }
        //проверка на столкновения
        testCollidings() {
            this.testCollidingLeft();
            this.testCollidingRight();
            this.testCollidingBottom();
            this.testCollidingTop();
        }
        testCollidingLeft() {
            for ( const box of this.arrCurrentStageBoxes ) {
                if ( box.coords.x < this.arrLogicalCells[0][0].coords.x ) {
                    ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );

                    for ( const box of this.arrCurrentStageBoxes ) {
                        box.coords.x += 21;
                    }
                }
            }
        }
        testCollidingRight() {
            for ( const box of this.arrCurrentStageBoxes ) {
                if ( box.coords.x > this.arrLogicalCells[0][9].coords.x  ) {
                    ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );

                    for ( const box of this.arrCurrentStageBoxes ) {
                        box.coords.x -= 21;
                    }
                }
            }
        }
        testCollidingBottom() {
            let moveableFlag;

            for ( const box of this.arrCurrentStageBoxes ) {  //проверка пересечения с дном
                if ( box.coords.y > this.arrLogicalCells[19][0].coords.y ) {
                    let dY = box.coords.y - this.arrLogicalCells[19][0].coords.y;

                    for ( const box of this.arrCurrentStageBoxes ) {
                        box.coords.y -= dY;
                        box.isMoveable = false;
                        //console.log( box, box.isMoveable );
                    }
                    moveableFlag = true;

                    this.isCollide = true;
                    //this.isElementDrop = false;
                  //  this.speed = this.prevSpeed;
                  //  console.log( this.speed, this.prevSpeed );
                    //console.log(' дно ');
                }
            }
            
            //loop:
            for ( const boxCurrent of this.arrCurrentStageBoxes ) {   //проверка пересечения с блоками
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                        if ( ( boxCurrent.coords.y + boxCurrent.size.height > this.arrStageBoxes[row][col].coords.y ) && 
                        boxCurrent.coords.x === this.arrStageBoxes[row][col].coords.x && 
                        boxCurrent.coords.x + boxCurrent.size.width === this.arrStageBoxes[row][col].coords.x + this.arrStageBoxes[row][col].size.width ) {

                        //console.log('collide');
                        //console.log( boxCurrent, boxStage );
                        let dY =  ( boxCurrent.coords.y + boxCurrent.size.height ) - this.arrStageBoxes[row][col].coords.y + 1;

                        for ( const box of this.arrCurrentStageBoxes ) {
                            box.coords.y -= dY;
                            box.isMoveable = false;
                            //console.log( dY, boxStage, boxCurrent );
                        }
                        moveableFlag = true;
                        this.isCollide = true;
                        // this.isElementDrop = false;
                       // this.speed = this.prevSpeed;
                       // console.log( this.speed, this.prevSpeed );

                        //console.log( dY, this.arrCurrentStageBoxes, this.arrStageBoxes );
                       // break loop;
                    }
                }

                    }
                }

                /*
                for ( const boxStage of this.arrStageBoxes ) {
                    if ( ( boxCurrent.coords.y + boxCurrent.size.height > boxStage.coords.y ) && 
                        boxCurrent.coords.x === boxStage.coords.x && 
                        boxCurrent.coords.x + boxCurrent.size.width === boxStage.coords.x + boxStage.size.width ) {

                        //console.log('collide');
                        //console.log( boxCurrent, boxStage );
                        let dY =  ( boxCurrent.coords.y + boxCurrent.size.height ) - boxStage.coords.y + 1;

                        for ( const box of this.arrCurrentStageBoxes ) {
                            box.coords.y -= dY;
                            box.isMoveable = false;
                            //console.log( dY, boxStage, boxCurrent );
                        }
                        moveableFlag = true;
                        this.isCollide = true;
                        // this.isElementDrop = false;
                       // this.speed = this.prevSpeed;
                       // console.log( this.speed, this.prevSpeed );

                        //console.log( dY, this.arrCurrentStageBoxes, this.arrStageBoxes );
                       // break loop;
                    }
                }*/
            }

            if ( moveableFlag ) {
                ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );
                for ( const box of this.arrCurrentStageBoxes ) {
                    box.drawBox();
                }

                //let swapArr = [];
                /*
                swapArr = this.arrStageBoxes.concat( this.arrCurrentStageBoxes );
                this.arrStageBoxes = swapArr.slice();
                */
                //loop2:
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        for ( const box of this.arrCurrentStageBoxes ) {
                            if ( this.arrLogicalCells[row][col].coords.x === box.coords.x && 
                                this.arrLogicalCells[row][col].coords.y === box.coords.y ) {
    
                                this.arrStageBoxes[row][col] = box;
                            }
    
                        }
        
                    }
                }

                this.arrCurrentStageBoxes = [];

                setTimeout( () => {
                    this.isCreateElement = false;
                }, 250 );

                console.log( this.arrStageBoxes, this.arrCurrentStageBoxes );
            }

        }
        //отрисовка положенных блоков в стакан
        drawStageBoxes() {
            if ( /*this.arrStageBoxes.length !== 0 */ this.isPlayTheGame && !this.isGameOver && !this.isGamePaused ) {
                
                ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );
                
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                            this.arrStageBoxes[row][col].drawBox();
                        }
                    }
                }
                /*
                for ( const box of this.arrStageBoxes ) {
                   // if ( typeof box === 'object' ) {
                        box.drawBox();
                    //}
                }*/
            }

            for ( const box of this.arrCurrentStageBoxes ) {
                box.drawBox();
            }

            ctxNextStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );

            for ( const box of this.arrCurrentNextBoxes ) {
                box.drawBox();
            }


        }
        //методы окончания игры
        testCollidingTop() {
            for ( let row = 0; row < 20; row++ ) {
                for ( let col = 0; col < 10; col++ ) {
                    if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                        if ( this.arrStageBoxes[row][col].coords.y < this.arrLogicalCells[1][0].coords.y ) {
                            // console.log('collide Top');
                            this.isGamePaused = true;
                            this.isGameOver = true;
                        }
        
                    }
                }
            }
            /*
            for ( const box of this.arrStageBoxes ) {   //проверка пересечения с блоками
                if ( box.coords.y < this.arrLogicalCells[1][0].coords.y ) {
                    // console.log('collide Top');
                    this.isGamePaused = true;
                    this.isGameOver = true;
                }
            }*/
        }
        getGameOver() {
            if ( this.isPlayTheGame && !this.isGameOver && !this.isGamePaused /*&& this.arrStageBoxes.length !== 0*/ && this.isCollide ) {
                //console.log( this.arrStageBoxes );
                for ( let row = 0; row < 20; row++ ) {
                    loop1:
                    for ( let col = 0; col < 10; col++ ) {
                        if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                            //if ( this.arrLogicalCells[row][col].coords.x === this.arrStageBoxes[rowStage][colStage].coords.x && 
                            //    this.arrLogicalCells[row][col].coords.y === this.arrStageBoxes[rowStage][colStage].coords.y  ) {

                                this.arrGameOverBoxes[row][col] = this.arrStageBoxes[row][col];
                           // }
                        }
    
                            
                        /*
                        loop2:
                        for ( const boxStage of this.arrStageBoxes ) {
                            for (const gameOverBox of this.arrGameOverBoxes) {
                                if ( gameOverBox === boxStage ) {
                                    continue loop2;
                                }
                            }

                            if ( this.arrLogicalCells[row][col].coords.x === boxStage.coords.x && this.arrLogicalCells[row][col].coords.y === boxStage.coords.y  ) {
                                this.arrGameOverBoxes[row][col] = boxStage;
                            }
                        }
                        */
                        //console.log( this.arrGameOverBoxes );

                        this.isCollide = false;
                    }
                }
                //проверяем заполненность рядов
                let rows = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                let rowsToDelete = [];
                loop3:
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        if ( typeof this.arrGameOverBoxes[row][col] === 'object' ) {
                            rows[row] += 1;
                            if ( rows[row] === 10 )  {
                                console.log( 'full row', row );
                                rowsToDelete.push(row);
                            }
                        }
                    }
                }
                //console.log( this.arrGameOverBoxes );
                
                console.log( rows );
                console.log( rowsToDelete );

                //удаление полных строк
                if ( rowsToDelete.length !== 0 ) {
                    const startIndexToDown = rowsToDelete[0] - 1;
                    const quantityRowsToDown = rowsToDelete.length;

                    console.log( quantityRowsToDown );

                    for ( const rowToDelete of rowsToDelete ) {
                        for ( let col = 0; col < 10; col++ ) {
                            delete this.arrGameOverBoxes[rowToDelete][col];
                            delete this.arrStageBoxes[rowToDelete][col];
                        }
                    }
                    
                    for ( let i = startIndexToDown; i > 0; i-- ) {
                        for ( let col = 0; col < 10; col++ ) {
                            if ( typeof this.arrStageBoxes[i][col] === 'object' ) {

                                this.arrStageBoxes[i][col].coords.y += (21 * quantityRowsToDown);

                                this.arrStageBoxes[i + quantityRowsToDown][col] = this.arrStageBoxes[i][col];
                                delete this.arrStageBoxes[i][col];

                                this.arrGameOverBoxes[i + quantityRowsToDown][col] = this.arrGameOverBoxes[i][col];
                                delete this.arrGameOverBoxes[i][col];
                            }
                        }
                    }

                    switch ( rowsToDelete.length ) {
                        case 1:
                            this.score += 100;
                            this.highScore += 100;
                            this.isRedrawSideUI = true;
                            break;
                        case 2:
                            this.score += 300;
                            this.highScore += 300;
                            this.isRedrawSideUI = true;
                            break;
                        case 3:
                            this.score += 700;
                            this.highScore += 700;
                            this.isRedrawSideUI = true;
                            break;
                        case 4:
                            this.score += 1500;
                            this.highScore += 1500;
                            this.isRedrawSideUI = true;
                            break;
                    }

                    //console.log( this.score );
                    //console.log( this.arrStageBoxes );
                    //console.log( this.arrGameOverBoxes );

                    /*
                    for ( let col = 0; col < 10; col++ ) {
                        //TODO сделать удаление из stageBoxes и потом перемещение блоков вниз в массиве и экране, надо переделать на двумерный массив
                        this.arrStageBoxes.splice( 0, 1 )
                        console.log( this.arrStageBoxes );
                        //delete this.arrStageBoxes[0]  delete оставляет пустоту в массиве
                       // delete this.arrGameOverBoxes[rowToDelete][col];
                    }
                    */
                    //console.log( this.arrGameOverBoxes );

                    rowsToDelete = [];
                }
            }
        }
        //сброс игры
        resetGame() {
            if ( this.isGameReset && this.isPlayTheGame ) {
                this.score = 0;
                //this.highScore = 0;
                this.#defaultSpeed = 0.125;
                this.#speed = this.#defaultSpeed;

                for ( let i = 0; i < 4; i++ ) {
                    this.arrCurrentNextBoxes[i].clearBox();
                    this.arrCurrentStageBoxes[i].clearBox();
                }
                this.arrCurrentNextBoxes = [];
                this.arrCurrentStageBoxes = [];
               // this.arrStageBoxes = [];
                //this.arrGameOverBoxes = [];
                { //arrStageBoxes
                    for ( let row = 0; row < 20; row++ ) {
                        this.arrStageBoxes[row] = [];
                        for ( let col = 0; col < 10; col++ ) {
                            this.arrStageBoxes[row][col];
                        }
                    }
                }
    
                { //arrGameOverBoxes
                    for ( let row = 0; row < 20; row++ ) {
                        this.arrGameOverBoxes[row] = [];
                        for ( let col = 0; col < 10; col++ ) {
                            this.arrGameOverBoxes[row][col];
                        }
                    }
                }

                this.currentNextElement.boxes = [];
                this.currentNextElement.type = '';
                this.currentNextElement.typeName = '';

                this.currentStageElement.boxes = [];
                this.currentStageElement.type = '';
                this.currentStageElement.typeName = '';

                this.isPlayTheGame = false;
                this.isGamePaused = false;
                this.isPressStart = true;
                this.isRedrawSideUI = true;
                this.#pauseStart = undefined;
                
                this.startGame(); 
                
                setTimeout( () => {
                    this.isCreateElement = false;
                }, 500 );

            }
        }

        drawScreen() {
            //this.test();

            this.drawBackGround();
            this.drawUI();
            this.drawLogicalMeshUi();
            this.drawLogicalMeshStage();
            this.checkPressButtons();
            this.drawSideUI();
            this.startGame();
            this.createElements();
            this.updateElement();
            this.drawStageBoxes();
            this.getGameOver();
            this.timerForChangeSpeed( this.#deltaTimer );

            this.resetGame();
        }
    }

    class LogicalCell {
        static counter = 0;
        static counterNextBoxes = 0;
        id = LogicalCell.counter;
        idNextBox = LogicalCell.counterNextBoxes;

        constructor( mode ) {
            this.mode = mode;
            this.path = new Path2D();

            if ( mode === 'cellStage' ) {
                LogicalCell.counter++;
            }else   
                if ( mode === 'cellNextBox' ) {
                    LogicalCell.counterNextBoxes++;
                }
        }

        coords = {
            x: 10,
            y: 10
        };
        coordsScale = {
            x: 15,
            y: 15
        };

        size = {
            width: 20,
            height: 20
        };
        isDrawCell = false;
        drawCell() {
            if ( !this.isDrawCell ) {
                if ( this.mode === 'cellStage' ) {                
                    ctxStageLogic.strokeStyle = '#ffffffaa';
                    this.path.rect( this.coords.x + 2, this.coords.y + 2, this.size.width - 2, this.size.height - 2 ); //в таком виде один пиксель между ячейками - ничейный
                    ctxStageLogic.stroke( this.path );
                    ctxStageLogic.strokeStyle = '#000000';

                }else
                    if ( this.mode === 'cellNextBox' ) {
                        ctxSideUILogic.setTransform( 1,0,0,1,0,0 );

                        ctxSideUILogic.strokeStyle = '#ffffffaa';
                        ctxSideUILogic.scale(0.5,0.5);

                        this.path.rect( this.coordsScale.x + 2, this.coordsScale.y + 2, this.size.width - 2, this.size.height - 2 ); //в таком виде один пиксель между ячейками - ничейный
                        ctxSideUILogic.stroke( this.path );
                        ctxSideUILogic.strokeStyle = '#000000';
                    }
                this.isDrawCell = true;
            }
        }
    }

    class Box {
        coords = {
            x: 10,
            y: 10
        };
        coordsScale = {
            x: 0,
            y: 0
        };

        size = {
            width: 20,
            height: 20
        };
        center = {
            x: 0,
            y: 0
        };
        constructor( mode ) {
            this.mode = mode;
        }
        isMoveable = true;

        drawBox() {
            if ( this.mode === 'stageBox' ) {
                //вычисление центра
                this.center.x = this.coords.x + 10;
                this.center.y =  this.coords.y + 10;
                this.path = new Path2D();
                ctxStage.fillStyle = '#2F4F4F';
                this.path.rect( this.coords.x + 1, this.coords.y + 1, this.size.width - 0, this.size.height - 0 ); //в таком виде один пиксель между ячейками - ничейный ( если -2 )
                ctxStage.fill( this.path );
                ctxStage.fillStyle = '#000000';
            }else   
                if ( this.mode === 'NextBox' ) {
                    this.path = new Path2D();
                    
                    ctxNextStage.setTransform( 1,0,0,1,0,0 );
                    ctxNextStage.fillStyle = '#2F4F4F';
                    ctxNextStage.scale(0.5,0.5);
                    this.path.rect( this.coordsScale.x + 1, this.coordsScale.y + 1, this.size.width - 0, this.size.height - 0 ); //в таком виде один пиксель между ячейками - ничейный ( если -2 )
                    ctxNextStage.fill( this.path );
                    ctxNextStage.fillStyle = '#000000';
                }
        }
        clearBox() {
            if ( this.mode === 'stageBox' ) {
                ctxStage.clearRect( this.coords.x + 1, this.coords.y + 1, this.size.width - 0, this.size.height - 0 );
            }else   
                if ( this.mode === 'NextBox' ) {
                    ctxNextStage.clearRect( this.coordsScale.x - 1, this.coordsScale.y - 1, this.size.width + 3, this.size.height + 3 );
                }
        }
    }

    //цикл игры
    function gameLoop() {
        game.drawScreen();
        
        window.requestAnimationFrame( gameLoop );
    }

    //обработчики событий
    function mouseMoveHandler( e ) {
        mouseMoveCoords.x = e.offsetX;
        mouseMoveCoords.y = e.offsetY;
    }

    function mouseUpHandler( e ) {
        if ( e.target.id === 'myCanvas_ui' ) {
                mouseClickCoords.x = e.offsetX;
                mouseClickCoords.y = e.offsetY;
            }
            /*
            else
                if ( e.target.id === 'myCanvas_side_ui' ) {
                    mouseClickSideCoords.x = e.offsetX;
                    mouseClickSideCoords.y = e.offsetY;
                }else
                    if ( e.target.id === 'myCanvas_side_ui_logical' ) {
                        mouseClickSideLogicCoords.x = e.offsetX;
                        mouseClickSideLogicCoords.y = e.offsetY;
                    }else
                    if ( e.target.id === 'myCanvas_stage_logical' ) {
                        mouseClickStageLogicCoords.x = e.offsetX;
                        mouseClickStageLogicCoords.y = e.offsetY;
                        
                    }*/
            //console.log(/* e.target.id,*/ 'Coords StageLogic=', mouseClickStageLogicCoords.x, mouseClickStageLogicCoords.y )
           // console.log(/* e.target.id,*/ 'Coords UILogic=', mouseClickSideLogicCoords.x, mouseClickSideLogicCoords.y )
           // console.log(/* e.target.id,*/ 'Coords Side=', mouseClickSideCoords.x, mouseClickSideCoords.y )

    }
    //проверка на нажатия кнопок клавиатурой
    function keyUpHandler( e ) {
        switch ( e.code ) {
            case 'Space': //бросок
                if ( !game.isElementDrop && game.isPlayTheGame ) {
                    game.isElementDrop = true;
                }
                game.isPressDrop = true;
                game.isRedrawUI = true;
                break;
            case 'ArrowLeft': //влево
                if ( !game.isElementLeft && game.isPlayTheGame ) {
                    game.isElementLeft = true;
                }
                game.isPressLeft = true;
                game.isRedrawUI = true;
                break;
            case 'ArrowRight': //вправо
                if ( !game.isElementRight && game.isPlayTheGame ) {
                    game.isElementRight = true;
                }
                game.isPressRight = true;
                game.isRedrawUI = true;
                break;
            case 'ArrowUp': //поворот
                if ( !game.isElementRotate && game.isPlayTheGame ) {
                    game.isElementRotate = true;
                }
                game.isPressRotate = true;
                game.isRedrawUI = true;
                break;
            case 'ArrowDown': //вниз чуток
                if ( !game.isElementDown && game.isPlayTheGame ) {
                    game.isElementDown = true;
                }
                game.isPressDown = true;
                game.isRedrawUI = true;
                break;
            case 'KeyR': //сброс
                if ( !game.isGameReset && game.isPlayTheGame ) {
                    game.isGameReset = true;
                }
                game.isPressReset = true;
                game.isRedrawUI = true;
                break;
            case 'KeyS': //старт
                game.isPressStart = true;
                game.isRedrawUI = true;
                break;
            case 'KeyP': //пауза
                if ( !game.isGamePaused && game.isPlayTheGame && !isGameOver ) {
                    game.isGamePaused = true;
                }else
                    if ( game.isGamePaused && game.isPlayTheGame && !isGameOver ) {
                        game.isGamePaused = false;
                    }
                game.isPressPause = true;
                game.isRedrawUI = true;
                break;
        }
    }
    //слушатели событий
    canvasUI.addEventListener( 'mouseup', mouseUpHandler );
    //canvasStageLogical.addEventListener( 'mouseup', mouseUpHandler );
    //canvasSideUILogical.addEventListener( 'mouseup', mouseUpHandler );

    document.addEventListener( 'keyup', keyUpHandler );
    /*
    window.addEventListener( 'resize', ()=> {
        if ( window.innerWidth < 460 ) {
            console.log(window.innerWidth);
            window.resizeBy( 100, 100 )
        }
    } );*/


    const imageBG = new Image();
    const imageStage = new Image();
    const imageButton = new Image();
    const imageButtonBig = new Image();
    imageBG.src = 'images/tetris-bg.png';
    imageStage.src = 'images/tetris-stage.png';
    imageButton.src = 'images/button.png';
    imageButtonBig.src = 'images/button-big.png';
    let arrLoadImage = [];

    const game = new Game();
    imageBG.addEventListener( 'load', imageLoad, false ); //game.startUp
    imageStage.addEventListener( 'load', imageLoad, false );
    imageButton.addEventListener( 'load', imageLoad, false );
    imageButtonBig.addEventListener( 'load', imageLoad, false );

    function imageLoad() {
        arrLoadImage.push( 'true' );
    }
    //проверяем загрузились или нет картинки через 1 секунду
    setTimeout( ()=> {
        if ( arrLoadImage.length === 4 ) {
            game.init();
        }else{
            console.log("images don't loaded");
        }
    }, 1000 ); 
}


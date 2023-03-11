window.addEventListener( "load", eventWindowLoaded, false );

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
        buttonVolume = new Path2D();
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
        
        #defaultSpeed = 0.250; //0.125
        #speed = this.#defaultSpeed; 
        dropSpeed = 4;
        #deltaTimer = 60; 
        #deltaSpeed = 0.250; //0.125

        score = 0;
        highScore = 0;

        isPressDrop = false;
        isPressLeft = false;
        isPressRight = false;
        isPressRotate = false;
        isPressDown = false;
        isPressStart = false;
        isButtonStartIsOn = true;
        isPressReset = false;
        isPressPause = false;
        isPressVolumeSet = true;

        isInitDraw = false;
        isRedrawUI = true;
        isRedrawSideUI = true;
        isRedrawScores = true;
        isRedrawSpeed = true;
        isRedrawPauseBulb = true;
        isDrawLogicalMeshUI = false;
        isDrawLogicalMeshStage = false;

        isCreateElement = false; 
        isPlayTheGame = false;
        isIdleScreen = true;
        isGameStart = false;
        isGamePaused = false;
        isGameReset = false;

        isCollide = false;
        isElementDown = false;
        isElementLeft = false;
        isElementRight = false;
        isElementDrop = false;
        isElementRotate = false;

        pauseStart = undefined;
        timerIdle;

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
                    this.arrLogicalCellsNextBox[row] = [];
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
        idleScreen() {
            if ( this.isIdleScreen ) {
                let randomColumn;
                let arrRandomIndeces = [];

                for ( let i = 0; i < 20; i++ ) {
                    randomColumn = Math.floor( Math.random() * 20 );
                    arrRandomIndeces;
                    arrRandomIndeces.push( randomColumn );
                }

                let arrElements = [];
                const delay = 250;
                const delayInterval = 500;

                //создаем
                for ( let row = 0; row < 20; row++ ) {
                    arrElements[row] = [];
                    for ( let col = 0; col < 10; col++ ) {
                        arrElements[row][col] = new Box( 'stageBox' );
                        arrElements[row][col].coords.x = this.arrLogicalCells[row][col].coords.x;
                        arrElements[row][col].coords.y = this.arrLogicalCells[row][col].coords.y;
                    }
                }
                //удаляем лишние
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        if ( row === arrRandomIndeces[col] ) {
                            //console.log( arrRandomIndeces[col] );
                            delete arrElements[row][col];
                        }
                    }
                }
               // console.log( arrElements );
                //интервал для задержки рисования
                let startIndex = 20;
                let startIndexToBottom = 0;

                this.timerIdle = setInterval( () => {
                if ( startIndex !== 0 ) {
                        startIndex--;
                        for ( let i = 0; i < 10; i++ ) {
                            if ( typeof arrElements[startIndex][i] === 'object' ) {
                                arrElements[startIndex][i].drawBox();
                            }
                        }
                    }
                    else
                        if ( startIndex === 0 ) {
                            if ( startIndexToBottom >= 0  && startIndexToBottom < 20 ) {
                                for ( let i = 0; i < 10; i++ ) {
                                    if ( typeof arrElements[startIndexToBottom][i] === 'object' ) {
                                    arrElements[startIndexToBottom][i].clearBox();
                                    }
                                }
                                startIndexToBottom++;
                            }
                            else
                                if ( startIndexToBottom === 20 ) {
                                    setTimeout( () => {
                                        this.isIdleScreen = true;
                                    }, delayInterval );
                                    clearInterval( this.timerIdle );
                                }
                        }
                }, delay );


                this.isIdleScreen = false;
            }
        }
        startSound( bool, frequency ) {
            let audioContext = new window.AudioContext();
            let notes;
    
            // Определить базовый звук как комбинацию из трех чистых синусоидальных волн.
            if ( !frequency ) {
                notes = [ 293.7, 370.0, 440.0 ]; //Аккорд ре мажор: ре, фа-диез и ля 293.7, 370.0, 440.0
            }else{
                notes = [ frequency ]; 
            }
            let oscillators = null;
    
            if ( bool ) {
                
                // Создать узлы генератора для каждой ноты, которые мы хотим воспроизводить.
                    oscillators = notes.map( note => {
                        let o = audioContext.createOscillator();
                        o.frequency.value = note;
                        return o;
                    });
    
                const type = 'square';
    
                oscillators.forEach( o => o.type = type );
                
                // устанавливаем громкость
                let volumeControl = audioContext.createGain();
                if ( this.isPressVolumeSet ) {
                    volumeControl.gain.value = 0.01;
                }else{
                    volumeControl.gain.value = 0;
                }
                //Мы собираемся посылать звук в стандартное место назначения: динамики пользователя.
                let speakers = audioContext.destination;
                // Подключить каждую исходную ноту к регулятору громкости.
                oscillators.forEach( о => о.connect( volumeControl ) );
                // И подключить выход регулятора громкости к динамикам.
                volumeControl.connect( speakers );
                // Теперь начать воспроизведение звуков и позволить ему длиться 1.25 секунды.
                let startTime = audioContext.currentTime;
                let stopTime = startTime + 0.5; //1.25
    
                oscillators.forEach( o => {
                    o.start( startTime );
                    o.stop( stopTime );
                });
            
            }
        }
        startMusic() {
            let arrFreq = [ 523.25, 587.32, 659.26, 698.46 ];
    
            for ( let i = 0; i < arrFreq.length; i++ ) {
                let delay = 70 * i * 2*4;
                setTimeout( () => {        
                    this.startSound( true, arrFreq[i] );
                }, delay );
            }
    
            for ( let i = arrFreq.length - 1, j = 0; i >= 0; i--, j++ ) {
                let delay = 2500 + 70 * j * 2*4;
                setTimeout( () => {        
                    this.startSound( true, arrFreq[i] );
                }, delay );
            }
        }
        //starts Demo load
        startGame() {
            if ( this.isGameStart && !this.isPlayTheGame ) {

                //startMusic();
                this.startMusic();
                this.isGameStart = false;
                
                let arrElements = [];
                const delay = 100;
                const delayInterval = 500;

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
                                    }, delayInterval );
                                    clearInterval( timer );
                                }
                        }
                }, delay );

            }
        }
        //таймер для смены скорости
        timerForChangeSpeed( deltaTimer ) {
            if ( this.isPlayTheGame && !this.isGamePaused ) {
                let delta;

                if ( this.pauseStart !== undefined ) {
                    const pauseEnd = new Date().getTime();
                    delta =  Math.round( ( pauseEnd - this.pauseStart ) / 1000 ) ;
                    //console.log( delta );
                }

                if ( this.pauseStart === undefined ) {
                    this.pauseStart = new Date().getTime(); 
                }   
                if ( delta === deltaTimer ) {
                    this.pauseStart = undefined;
                    this.#speed += this.#deltaSpeed;
                    this.isRedrawSideUI = true;
                    this.isRedrawSpeed = true;
                    console.log( 'speedChanged', this.#speed );
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

                ctxBG.fillText( 'Pause', this.coords.x + 360, this.coords.y + 335 );

                ctxBG.font = "10px Sans";
                ctxBG.fillText( 'OVVosokor', this.coords.x + 405, this.coords.y + 570 );

                ctxBG.font = "20px Sans";

                ctxBG.stroke();

                ctxBG.drawImage( imageBulbPause, 0, 0, 50, 50, this.coords.x + 405, this.coords.y + 321, 20, 20 );

                this.isInitDraw = true;
            }
        }
        //рисуем сбоку элементы
        drawSideUI() {
            if ( this.isRedrawSideUI ) {
                { //отрисовка очков
                    if ( this.isRedrawScores ) {
                        ctxSideUI.clearRect( 0, 0, canvasSideUI.width, 290 ); 
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
                            }
                            ctxSideUI.fillText( `${ b[0] }${ b[1] }${ b[2] }${ b[3] }${ b[4] }${ b[5] }${ b[6] }`, this.coords.x + 10, this.coords.y + 247 );
                        }
                    }
                }

                { //отрисовка скорости
                    if ( this.isRedrawSpeed ) {
                        ctxSideUI.clearRect( 0, 290, canvasSideUI.width, 320 ); 
    
                        let s = this.#speed * 4; // * 8
                        if ( s >= 10 ) {
                            ctxSideUI.fillText( `${ s }`, this.coords.x + 35, this.coords.y + 307 );
                        }else{
                            ctxSideUI.fillText( `${ s }`, this.coords.x + 40, this.coords.y + 307 );
                        }
                    }
                }

                { //отрисовка паузы
                    if ( this.isRedrawPauseBulb ) {
                        ctxSideUI.clearRect( 0, 320, canvasSideUI.width, 350 ); 
                        if ( this.isGamePaused ) {
                            let posImage = 50;

                            ctxSideUI.drawImage( imageBulbPause, posImage, 0, 50, 50, this.coords.x + 56, this.coords.y + 321, 20, 20 );
                        }
                    }
                }
                
                this.isRedrawSideUI = false;
                this.isRedrawScores = false;
                this.isRedrawSpeed = false;
                this.isRedrawPauseBulb = false;
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
                        //замедление отжатия кнопки
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
                        //замедление отжатия кнопки
                        setTimeout( () => {
                            this.isRedrawUI = true;
                        }, 100 );
                        posImage = 50;
                    }
                {
                    //set Volume
                    let posImage = 50;
                    if ( !this.isPressVolumeSet ) {
                        ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 363, this.coords.y + 118, 20, 20 );
                    }else
                        if ( this.isPressVolumeSet ) {
                            posImage -= 51;
                            ctxUI.drawImage( imageButton, posImage, 0, 50, 50, this.coords.x + 363, this.coords.y + 118, 20, 20 );
                        }
                }
    
                ctxUI.strokeText( 'Reset', this.coords.x + 362, this.coords.y + 47 );
                ctxUI.strokeText( 'Left', this.coords.x + 173, this.coords.y + 75 );
                ctxUI.strokeText( 'Right', this.coords.x + 320, this.coords.y + 75 );
                ctxUI.strokeText( 'Rotate', this.coords.x + 241, this.coords.y + 66 );
                ctxUI.strokeText( 'Down', this.coords.x + 242, this.coords.y + 86 );
                ctxUI.strokeText( 'Start', this.coords.x + 362, this.coords.y + 10 );
                ctxUI.strokeText( 'Pause', this.coords.x + 362, this.coords.y + 84 );
                ctxUI.strokeText( 'Volume', this.coords.x + 362, this.coords.y + 117 );

                this.isRedrawUI = false;
            }
        }
        //рисуем логические сетки
        drawLogicalMeshStage() {
            if ( !this.isDrawLogicalMeshStage ) {
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
                //Volume
                this.buttonVolume.arc( this.coords.x + 373, this.coords.y + 128, 8, 0, 2 * Math.PI );
                ctxUI.fill( this.buttonVolume );

                this.isDrawLogicalMesh = true;
            }
        }
        //проверка на нажатия кнопок мышью
        checkPressButtons() {
            if ( ctxUI.isPointInPath( this.buttonDrop, mouseClickCoords.x, mouseClickCoords.y ) ) {
                //console.log('Drop');
                if ( !this.isElementDrop && this.isPlayTheGame && !this.isGamePaused ) {
                    this.isElementDrop = true;
                }
                this.isPressDrop = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonLeft, mouseClickCoords.x, mouseClickCoords.y ) ) {
                // console.log('Left');
                if ( !this.isElementLeft && this.isPlayTheGame && !this.isGamePaused ) {
                    this.isElementLeft = true;
                }
                this.isPressLeft = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonRight, mouseClickCoords.x, mouseClickCoords.y ) ) {
                //console.log('Right');
                if ( !this.isElementRight && this.isPlayTheGame && !this.isGamePaused ) {
                    this.isElementRight = true;
                }
                this.isPressRight = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonRotate, mouseClickCoords.x, mouseClickCoords.y ) ) {
                //console.log('Rotate');
                if ( !this.isElementRotate && this.isPlayTheGame && !this.isGamePaused ) {
                    this.isElementRotate = true;
                }
                this.isPressRotate = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonDown, mouseClickCoords.x, mouseClickCoords.y ) ) {
                //console.log('Down');
                if ( !this.isElementDown && this.isPlayTheGame && !this.isGamePaused ) {
                    this.isElementDown = true;
                }
                this.isPressDown = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonStart, mouseClickCoords.x, mouseClickCoords.y ) ) {
                //console.log('Start', this.isButtonStartIsOn );
                if ( this.isButtonStartIsOn && !this.isGameStart && !this.isPlayTheGame && !this.isGamePaused ) {
                    ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height);
                    clearInterval( this.timerIdle );
                    this.isIdleScreen = false;
                    this.isGameStart = true;
                }
                this.isButtonStartIsOn = false;
                this.isPressStart = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonReset, mouseClickCoords.x, mouseClickCoords.y ) ) {
                //console.log('Reset');
                if ( !this.isGameReset && this.isPlayTheGame ) {
                    this.isGameReset = true;
                }
                this.isPressReset = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonPause, mouseClickCoords.x, mouseClickCoords.y ) ) {
                //console.log( 'Pause' );
                if ( !this.isGamePaused && this.isPlayTheGame ) {
                    this.pauseStart = undefined;

                    this.isGamePaused = true;
                    this.isRedrawPauseBulb = true;
                    this.isRedrawSideUI = true;
                }else
                    if ( this.isGamePaused && this.isPlayTheGame ) {
                        this.isGamePaused = false;
                        this.isRedrawPauseBulb = true;
                        this.isRedrawSideUI = true;
                    }
                this.isPressPause = true;
                this.isRedrawUI = true;
            }
            if ( ctxUI.isPointInPath( this.buttonVolume, mouseClickCoords.x, mouseClickCoords.y ) ) {
                //console.log( 'Volume' );
                if ( !this.isPressVolumeSet ) {
                    this.isPressVolumeSet = true;
                }else
                    if ( this.isPressVolumeSet ) {
                        this.isPressVolumeSet = false;
                    }
                this.isRedrawUI = true;
            }


            if ( mouseClickCoords.x !== undefined && mouseClickCoords.y !== undefined ) {
                mouseClickCoords.x = undefined;
                mouseClickCoords.y = undefined;
            }
        }
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
                if ( typeElement.typeName === 'typeI' ) {
                    startPosition = game.arrLogicalCellsNextBox[3][2];
                }else
                    if ( typeElement.typeName === 'typeT' ) {
                        startPosition = game.arrLogicalCellsNextBox[3][3];
                    }else 
                        if ( typeElement.typeName === 'typeS' || typeElement.typeName === 'typeO' ) {
                            startPosition = game.arrLogicalCellsNextBox[3][3];
                        }else{
                            startPosition = game.arrLogicalCellsNextBox[2][3];
                        }
    
                for ( let i = 0; i < 4; i++ ) {
                    this.arrCurrentNextBoxes[i] = new Box( mode ); 
                }
            }

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
            }else
                if ( mode === 'stageBox' ) {
                    this.currentStageElement.boxes = this.arrCurrentStageBoxes;
                    this.currentStageElement.typeName = typeElement.typeName;
                    this.currentStageElement.type = typeElement;
                }

                /*
            if ( mode === 'stageBox' ) {
                this.currentStageElement.border.width = 65;
                this.currentStageElement.border.height = 65;

            //создаем границы для проверки возможности поворота
            if ( typeElement.typeName === 'typeS' || typeElement.typeName === 'typeZ' ) {
                this.currentStageElement.border.x = this.arrCurrentStageBoxes[0].coords.x-21;
                this.currentStageElement.border.y = this.arrCurrentStageBoxes[0].coords.y-21;
                //console.log( this.currentStageElement, this.arrCurrentStageBoxes[0].coords.x );

            }else
                if ( typeElement.typeName === 'typeT' ) {
                    this.currentStageElement.border.x = this.arrCurrentStageBoxes[0].coords.x;
                    this.currentStageElement.border.y = this.arrCurrentStageBoxes[0].coords.y-21;
                    //console.log( this.currentStageElement, this.arrCurrentStageBoxes[0].coords.x );
                }else
                    if ( typeElement.typeName === 'typeJ' ) {
                        this.currentStageElement.border.x = this.arrCurrentStageBoxes[0].coords.x-21;
                        this.currentStageElement.border.y = this.arrCurrentStageBoxes[0].coords.y;
                       // console.log( this.currentStageElement, this.arrCurrentStageBoxes[0].coords.x );
                    }else
                        if ( typeElement.typeName === 'typeO' ) {
                            this.currentStageElement.border.x = this.arrCurrentStageBoxes[0].coords.x;
                            this.currentStageElement.border.y = this.arrCurrentStageBoxes[0].coords.y;
                            this.currentStageElement.border.width -= 21;
                            this.currentStageElement.border.height -= 21;

                            //console.log( this.currentStageElement, this.arrCurrentStageBoxes[0].coords.x );
                        }else
                            if ( typeElement.typeName === 'typeI' ) {
                                this.currentStageElement.border.x = this.arrCurrentStageBoxes[0].coords.x;
                                this.currentStageElement.border.y = this.arrCurrentStageBoxes[0].coords.y-42;
                                this.currentStageElement.border.width += 21;
                                this.currentStageElement.border.height += 21;
    
                                //console.log( this.currentStageElement, this.arrCurrentStageBoxes[0].coords.x );
                            }else
                                if ( typeElement.typeName === 'typeL' ) {
                                    this.currentStageElement.border.x = this.arrCurrentStageBoxes[0].coords.x-21;
                                    this.currentStageElement.border.y = this.arrCurrentStageBoxes[0].coords.y+0;
                                // this.currentStageElement.border.width += 21;
                                    //this.currentStageElement.border.height += 21;
        
                                    //console.log( this.currentStageElement, this.arrCurrentStageBoxes[0].coords.x );
                                }
            }*/
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

                this.createElement( 'stageBox', typeStage ); 
                this.createElement( 'NextBox', typeNext ); 

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
                    this.moveDownElement();
                    this.moveLeftElement();
                    this.moveRightElement();
                    this.moveElement();

                    this.moveDropElement();
                    this.testCollidings();
                }
            }
        }
        isCanRotate( direction ) {
            //клонируем
            const copyCurrentStageElement = _.cloneDeep( this.currentStageElement );
            const copyDirection = Object.assign( {}, direction );
            let copyArrCurrentStageBoxes = [];

            for ( const boxCurrent of this.arrCurrentStageBoxes ) {
                const copyBox = _.cloneDeep( boxCurrent );
                copyArrCurrentStageBoxes.push( copyBox );
            }

            if ( copyDirection.k === undefined ) {
                copyDirection.k = 1;
                
                switch ( copyDirection.type ) {
                    case 'bottom':
                        this.rotate( copyArrCurrentStageBoxes, copyCurrentStageElement.type.rotate.bottom, copyDirection );
                        //console.log( copyCurrentStageElement.type.rotate.bottom );
                        break;
                    case 'left':
                        this.rotate( copyArrCurrentStageBoxes, copyCurrentStageElement.type.rotate.left, copyDirection );
                        //console.log( copyCurrentStageElement.type.rotate.left );
                        break;
                    case 'top':
                        this.rotate( copyArrCurrentStageBoxes, copyCurrentStageElement.type.rotate.top, copyDirection );
                        //console.log( copyCurrentStageElement.type.rotate.top );
                        break;
                    case 'right':
                        this.rotate( copyArrCurrentStageBoxes, copyCurrentStageElement.type.rotate.right, copyDirection );
                        //console.log( copyCurrentStageElement.type.rotate.right );
                        break;
                }
            }else
                if ( copyDirection.k !== undefined ) {
                    this.rotate( copyArrCurrentStageBoxes, copyCurrentStageElement.type.rotate, copyDirection );
                }

                //проверка на пересечение
                let test = [];
                for (const boxCurrent of copyArrCurrentStageBoxes ) {
                    for ( let row = 0; row < 20; row++ ) {
                        for ( let col = 0; col < 10; col++ ) {
                            if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                                if ( boxCurrent.coords.x === this.arrStageBoxes[row][col].coords.x && boxCurrent.coords.x + boxCurrent.size.width === this.arrStageBoxes[row][col].coords.x + this.arrStageBoxes[row][col].size.width &&
                                    boxCurrent.coords.y >= this.arrStageBoxes[row][col].coords.y ) {
                                    //console.log('!collide!');
                                    //console.log( boxCurrent );
                                    console.log('!collide!');
                                    test.push( 'false' );
                                }
                            }
                        }
                    }
                }
                //console.log( test );

                if ( test.includes( 'false' ) ) {
                    //console.log( 'false!!' );
                    return false;
                }else{
                    //console.log( 'true!!' );
                    return true;
                }
        }
        rotate( arrToRotate, rotate, direction ) {
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
                //this.arrCurrentStageBoxes[i].coords.x = this.arrCurrentStageBoxes[i].coords.x + typeRotateX;
                //this.arrCurrentStageBoxes[i].coords.y = this.arrCurrentStageBoxes[i].coords.y + typeRotateY;
                arrToRotate[i].coords.x = arrToRotate[i].coords.x + typeRotateX;
                arrToRotate[i].coords.y = arrToRotate[i].coords.y + typeRotateY;

            }

        }
        rotateElement() {
            if ( this.isElementRotate &&  !this.isElementDrop ) {
                
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
                                direction.type = 'horizontal'; 
                                direction.k = 1;
                            }else
                                if ( arrY[0] === arrY[3] ) {
                                    direction.type = 'vertical'; 
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
                                        direction.type = 'horizontal'; 
                                        direction.k = 1;
                                    }else
                                        if ( arrY[1] === arrY[2] ) {
                                            direction.type = 'vertical'; 
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

                //this.isCanRotate( direction );
                if ( this.isCanRotate( direction ) ) {
                    //меняем координаты
                    if ( direction.k === undefined ) {
                        direction.k = 1;
                        
                        switch ( direction.type ) {
                            case 'bottom':
                                this.rotate( this.arrCurrentStageBoxes, this.currentStageElement.type.rotate.bottom, direction );
                                //console.log( this.currentStageElement.type.rotate.bottom );
                                break;
                            case 'left':
                                this.rotate( this.arrCurrentStageBoxes, this.currentStageElement.type.rotate.left, direction );
                                //console.log( this.currentStageElement.type.rotate.left );
                                break;
                            case 'top':
                                this.rotate( this.arrCurrentStageBoxes, this.currentStageElement.type.rotate.top, direction );
                                //console.log( this.currentStageElement.type.rotate.top );
                                break;
                            case 'right':
                                this.rotate( this.arrCurrentStageBoxes, this.currentStageElement.type.rotate.right, direction );
                                //console.log( this.currentStageElement.type.rotate.right );
                                break;
                        }
                    }else
                        if ( direction.k !== undefined ) {
                            this.rotate( this.arrCurrentStageBoxes, this.currentStageElement.type.rotate, direction );
                        }
                }
                //console.log( this.currentStageElement );

                this.isElementRotate = false;
            }
        }
        moveElement() {
            ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );
            for ( const box of this.arrCurrentStageBoxes ) {
                if ( !this.isElementDrop ) {
                    box.coords.y += this.#speed;
                }else
                    if ( this.isElementDrop ) {
                        box.coords.y += this.dropSpeed;
                    }
                box.drawBox();
            }

            
            //this.currentStageElement.border.y += this.#speed;
        }
        moveDownElement() {
            if ( this.isElementDown ) {
                this.#speed += 0.125;
                setTimeout( () => {
                    this.isElementDown = false;
                    this.#speed -= 0.125;
                }, 400 );
            }
        }
        testCollidingWithBoxes( k ) {
            for ( const boxCurrent of this.arrCurrentStageBoxes ) {   //проверка пересечения с блоками
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                            if ( ( boxCurrent.coords.x < this.arrStageBoxes[row][col].coords.x + this.arrStageBoxes[row][col].size.width ) && 
                                ( boxCurrent.coords.x + boxCurrent.size.width > this.arrStageBoxes[row][col].coords.x ) && 
                                boxCurrent.coords.y > this.arrStageBoxes[row][col].coords.y - 20 && 
                                boxCurrent.coords.y + boxCurrent.size.height < this.arrStageBoxes[row][col].coords.y + this.arrStageBoxes[row][col].size.height + 20 ) {
                                let dX =  ( boxCurrent.coords.x + boxCurrent.size.width ) - this.arrStageBoxes[row][col].coords.x + 1;

                                for ( const boxCurrent of this.arrCurrentStageBoxes ) {
                                    boxCurrent.coords.x += dX * k;
                                    //console.log( dX, this.isElementLeft, this.isElementRight );
                                }
                            }
                        }
                    }
                }
            }
        }
        moveLeftElement() {
            if ( this.isElementLeft ) {
                const offsetLeft = 21;
                for ( const boxCurrent of this.arrCurrentStageBoxes ) {
                    boxCurrent.coords.x -= offsetLeft;
                    boxCurrent.drawBox();
                }
                this.testCollidingWithBoxes( 1 );
               // this.currentStageElement.border.x -= offsetLeft;

                this.isElementLeft = false;
            }
        }
        moveRightElement() {
            if ( this.isElementRight ) {
                const offsetRight = 21;
                for ( const boxCurrent of this.arrCurrentStageBoxes ) {
                    boxCurrent.coords.x += offsetRight;
                    boxCurrent.drawBox();
                }

                this.testCollidingWithBoxes( -1 );
               // this.currentStageElement.border.x += offsetRight;

                this.isElementRight = false;
            }
        }
        moveDropElement() {
            if ( this.isElementDrop ) {
                //ограничение по высоте , если выше 6 ряда, то бросок не работает
                for ( let col = 0; col < 10; col++ ) {
                    if ( typeof this.arrStageBoxes[6][col] === 'object' ) {
                        return this.isElementDrop = false;
                    }
                }
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
            for ( const boxCurrent of this.arrCurrentStageBoxes ) { //проверка пересечения со стаканом
                if ( boxCurrent.coords.x < this.arrLogicalCells[0][0].coords.x ) {
                    ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );

                    for ( const boxCurrent of this.arrCurrentStageBoxes ) {
                        boxCurrent.coords.x += 21;
                    }
                }
            }
        }
        testCollidingRight() {
            for ( const boxCurrent of this.arrCurrentStageBoxes ) { //проверка пересечения со стаканом
                if ( boxCurrent.coords.x > this.arrLogicalCells[0][9].coords.x  ) {
                    ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );

                    for ( const boxCurrent of this.arrCurrentStageBoxes ) {
                        boxCurrent.coords.x -= 21;
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
                    }
                    moveableFlag = true;
                    this.isCollide = true;
                }
            }
            
            for ( const boxCurrent of this.arrCurrentStageBoxes ) {   //проверка пересечения с блоками
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                            if ( ( boxCurrent.coords.y + boxCurrent.size.height > this.arrStageBoxes[row][col].coords.y ) && 
                                ( boxCurrent.coords.y + boxCurrent.size.height < this.arrStageBoxes[row][col].coords.y + this.arrStageBoxes[row][col].size.height ) && 
                                boxCurrent.coords.x === this.arrStageBoxes[row][col].coords.x && 
                                boxCurrent.coords.x + boxCurrent.size.width === this.arrStageBoxes[row][col].coords.x + this.arrStageBoxes[row][col].size.width ) {
                                let dY =  ( boxCurrent.coords.y + boxCurrent.size.height ) - this.arrStageBoxes[row][col].coords.y + 1;

                                for ( const box of this.arrCurrentStageBoxes ) {
                                    box.coords.y -= dY;
                                    box.isMoveable = false;
                                }
                                moveableFlag = true;
                                this.isCollide = true;
                            }
                        }
                    }
                }
            }

            if ( moveableFlag ) {
                clickSound.play();

                ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );
                for ( const box of this.arrCurrentStageBoxes ) {
                    box.drawBox();
                }

                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        for ( const box of this.arrCurrentStageBoxes ) {
                            if ( this.arrLogicalCells[row][col].coords.x === box.coords.x && this.arrLogicalCells[row][col].coords.y === box.coords.y ) {
                                this.arrStageBoxes[row][col] = box;
                            }
                        }
                    }
                }

                this.arrCurrentStageBoxes = [];
                this.isElementDrop = false;

                setTimeout( () => {
                    this.isCreateElement = false;
                }, 250 );

                //console.log( this.arrStageBoxes, this.arrCurrentStageBoxes );
            }

        }
        //отрисовка положенных блоков в стакан
        drawStageBoxes() {
            if ( this.isPlayTheGame && !this.isGamePaused ) {
                
                ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );
                
                for ( let row = 0; row < 20; row++ ) {
                    for ( let col = 0; col < 10; col++ ) {
                        if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                            this.arrStageBoxes[row][col].drawBox();
                        }
                    }
                }
                
                //draw Border
                //ctxStage.rect( this.currentStageElement.border.x, this.currentStageElement.border.y, this.currentStageElement.border.width, this.currentStageElement.border.height )
                //ctxStage.stroke()
                //console.log( this.currentStageElement );
    
            }

            for ( const box of this.arrCurrentStageBoxes ) {
                box.drawBox();
            }

            ctxNextStage.clearRect( 0, 0, canvasStage.width, canvasStage.height );

            for ( const box of this.arrCurrentNextBoxes ) {
                box.drawBox();
            }
            /*
            //draw Border
            ctxStage.rect( this.currentStageElement.border.x, this.currentStageElement.border.y, this.currentStageElement.border.width, this.currentStageElement.border.height )
            ctxStage.stroke()*/
        }
        //методы окончания игры
        testCollidingTop() {
            for ( let row = 0; row < 20; row++ ) {
                for ( let col = 0; col < 10; col++ ) {
                    if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                        //console.log( this.arrStageBoxes, this.arrLogicalCells[2][0].coords.y );
                        if ( this.arrStageBoxes[row][col].coords.y <= this.arrLogicalCells[2][0].coords.y ) {
                            this.isGamePaused = true;
                            this.isGameReset = true;
                            ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height )
                            this.isInitDraw = false;
                        }
                    }
                }
            }
        }
        getGameOver() {
            if ( this.isPlayTheGame && !this.isGamePaused && this.isCollide ) {
                for ( let row = 0; row < 20; row++ ) {
                    loop1:
                    for ( let col = 0; col < 10; col++ ) {
                        if ( typeof this.arrStageBoxes[row][col] === 'object' ) {
                                this.arrGameOverBoxes[row][col] = this.arrStageBoxes[row][col];
                        }
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
                                //console.log( 'full row', row );
                                rowsToDelete.push(row);
                            }
                        }
                    }
                }
                
                //console.log( rows );
                //console.log( rowsToDelete );

                //удаление полных строк
                if ( rowsToDelete.length !== 0 ) {
                    const startIndexToDown = rowsToDelete[rowsToDelete.length - 1];

                    const quantityRowsToDown = rowsToDelete.length;

                    //console.log( quantityRowsToDown );

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
                            this.isRedrawScores = true;
                            break;
                        case 2:
                            this.score += 300;
                            this.highScore += 300;
                            this.isRedrawSideUI = true;
                            this.isRedrawScores = true;
                            break;
                        case 3:
                            this.score += 700;
                            this.highScore += 700;
                            this.isRedrawSideUI = true;
                            this.isRedrawScores = true;
                            break;
                        case 4:
                            this.score += 1500;
                            this.highScore += 1500;
                            this.isRedrawSideUI = true;
                            this.isRedrawScores = true;
                            break;
                    }
                    //console.log( this.arrGameOverBoxes );
                    rowsToDelete = [];
                }
            }
        }
        //сброс игры
        resetGame() {
            if ( this.isGameReset && this.isPlayTheGame ) {
                this.score = 0;
                //this.#defaultSpeed = 0.125;
                this.#speed = this.#defaultSpeed;

                ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height )
                ctxNextStage.clearRect( 0, 0, canvasNextStage.width, canvasNextStage.height )
                this.arrCurrentNextBoxes = [];
                this.arrCurrentStageBoxes = [];

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
                this.isGameStart = true;
                this.isRedrawSideUI = true;
                this.isRedrawScores = true;
                this.isRedrawSpeed = true;
                this.isRedrawPauseBulb = true;
                this.pauseStart = undefined;
                
                this.startGame(); 
                
                setTimeout( () => {
                    this.isGamePaused = true;
                    this.isRedrawSideUI = true;
                    this.isCreateElement = false;
                    this.isRedrawPauseBulb = true;
                }, 4000 );
            }
        }

        drawScreen() {
            this.drawBackGround();
            this.drawUI();
            this.drawLogicalMeshUi();
            this.drawLogicalMeshStage();
            this.checkPressButtons();
            this.drawSideUI();

            this.idleScreen();
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
                    this.path.rect( this.coords.x + 2, this.coords.y + 2, this.size.width - 2, this.size.height - 2 ); 
                    ctxStageLogic.stroke( this.path );
                    ctxStageLogic.strokeStyle = '#000000';

                }else
                    if ( this.mode === 'cellNextBox' ) {
                        ctxSideUILogic.setTransform( 1,0,0,1,0,0 );

                        ctxSideUILogic.strokeStyle = '#ffffffaa';
                        ctxSideUILogic.scale(0.5,0.5);

                        this.path.rect( this.coordsScale.x + 2, this.coordsScale.y + 2, this.size.width - 2, this.size.height - 2 );
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
                this.path.rect( this.coords.x + 1, this.coords.y + 1, this.size.width, this.size.height ); 
                ctxStage.fill( this.path );
                ctxStage.fillStyle = '#000000';
            }else   
                if ( this.mode === 'NextBox' ) {
                    this.path = new Path2D();
                    
                    ctxNextStage.setTransform( 1,0,0,1,0,0 );
                    ctxNextStage.fillStyle = '#2F4F4F';
                    ctxNextStage.scale(0.5,0.5);
                    this.path.rect( this.coordsScale.x + 1, this.coordsScale.y + 1, this.size.width, this.size.height ); 
                    ctxNextStage.fill( this.path );
                    ctxNextStage.fillStyle = '#000000';
                }
        }
        clearBox() {
            if ( this.mode === 'stageBox' ) {
                ctxStage.clearRect( this.coords.x + 1, this.coords.y + 1, this.size.width, this.size.height );
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
    function mouseUpHandler( e ) {
        if ( e.target.id === 'myCanvas_ui' ) {
                mouseClickCoords.x = e.offsetX;
                mouseClickCoords.y = e.offsetY;
            }
    }
    //проверка на нажатия кнопок клавиатурой
    function keyUpHandler( e ) {
        switch ( e.code ) {
            case 'Space': //бросок
                if ( !game.isElementDrop && game.isPlayTheGame && !game.isGamePaused ) {
                    game.isElementDrop = true;
                }
                game.isPressDrop = true;
                game.isRedrawUI = true;
                break;
            case 'ArrowLeft': //влево
                if ( !game.isElementLeft && game.isPlayTheGame && !game.isGamePaused ) {
                    game.isElementLeft = true;
                }
                game.isPressLeft = true;
                game.isRedrawUI = true;
                break;
            case 'ArrowRight': //вправо
                if ( !game.isElementRight && game.isPlayTheGame && !game.isGamePaused ) {
                    game.isElementRight = true;
                }
                game.isPressRight = true;
                game.isRedrawUI = true;
                break;
            case 'ArrowUp': //поворот
                if ( !game.isElementRotate && game.isPlayTheGame && !game.isGamePaused ) {
                    game.isElementRotate = true;
                }
                game.isPressRotate = true;
                game.isRedrawUI = true;
                break;
            case 'ArrowDown': //вниз чуток
                if ( !game.isElementDown && game.isPlayTheGame && !game.isGamePaused ) {
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
                if ( game.isButtonStartIsOn && !game.isGameStart && !game.isPlayTheGame && !game.isGamePaused ) {
                    ctxStage.clearRect( 0, 0, canvasStage.width, canvasStage.height)
                    clearInterval( game.timerIdle );
                    game.isIdleScreen = false;
                    game.isGameStart = true;
                }
                game.isButtonStartIsOn = false;
                game.isPressStart = true;
                game.isRedrawUI = true;
                break;
            case 'KeyP': //пауза
                if ( !game.isGamePaused && game.isPlayTheGame ) {
                    game.pauseStart = undefined;
                    game.isGamePaused = true;
                    game.isRedrawPauseBulb = true;
                    game.isRedrawSideUI = true;
                }else
                    if ( game.isGamePaused && game.isPlayTheGame ) {
                        game.isGamePaused = false;
                        game.isRedrawPauseBulb = true;
                        game.isRedrawSideUI = true;
                    }
                game.isPressPause = true;
                game.isRedrawUI = true;
                break;
            case 'KeyV': //пауза
                if ( !game.isPressVolumeSet ) {
                    game.isPressVolumeSet = true;
                }else
                    if ( game.isPressVolumeSet ) {
                        game.isPressVolumeSet = false;
                    }
                    game.isRedrawUI = true;
                break;
        }
    }
    //слушатели событий
    canvasUI.addEventListener( 'mouseup', mouseUpHandler );
    document.addEventListener( 'keyup', keyUpHandler );

    const clickSound = document.getElementById( 'clicksound' );

    const imageBG = new Image();
    const imageStage = new Image();
    const imageButton = new Image();
    const imageButtonBig = new Image();
    const imageBulbPause = new Image();
    imageBG.src = 'images/tetris-bg.png';
    imageStage.src = 'images/tetris-stage.png';
    imageButton.src = 'images/button.png';
    imageButtonBig.src = 'images/button-big.png';
    imageBulbPause.src = 'images/bulb.png';
    let arrLoadImage = [];

    const game = new Game();
    imageBG.addEventListener( 'load', imageLoad, false ); 
    imageStage.addEventListener( 'load', imageLoad, false );
    imageButton.addEventListener( 'load', imageLoad, false );
    imageButtonBig.addEventListener( 'load', imageLoad, false );
    imageBulbPause.addEventListener( 'load', imageLoad, false );

    clickSound.addEventListener( 'load', soundLoader, false );

    function soundLoader() {
        clickSound.load();
    }

    function imageLoad() {
        arrLoadImage.push( 'true' ); 
    }
    //проверяем загрузились или нет картинки через 1 секунду
    setTimeout( ()=> {
        if ( arrLoadImage.length === 5 ) {
            game.init();
        }else{
            console.log("images don't loaded");
        }
    }, 1000 ); 
}

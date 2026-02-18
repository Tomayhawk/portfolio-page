type EngineMessage = {
  uciMessage: string;
  bestMove?: string | undefined;
  ponder?: string | undefined;
  positionEvaluation?: string | undefined;
  possibleMate?: string | undefined;
  pv?: string | undefined;
  depth?: number | undefined;
  multipv?: number | undefined; 
};

export default class Engine {
  stockfish: Worker;
  onMessage: (callback: (messageData: EngineMessage) => void) => void;
  isReady: boolean;

  constructor() {
    this.stockfish = new Worker('/stockfish.wasm.js');
    this.isReady = false;
    
    this.onMessage = (callback) => {
      this.stockfish.addEventListener('message', (e) => {
        callback(this.transformSFMessageData(e));
      });
    };

    this.init();
  }

  private transformSFMessageData(e: MessageEvent): EngineMessage {
    const uciMessage = e.data;

    // Parse MultiPV (e.g., "multipv 1")
    const multipvMatch = uciMessage.match(/multipv\s+(\d+)/);
    const multipv = multipvMatch ? parseInt(multipvMatch[1]) : undefined;

    return {
      uciMessage,
      bestMove: uciMessage.match(/bestmove\s+(\S+)/)?.[1],
      ponder: uciMessage.match(/ponder\s+(\S+)/)?.[1],
      positionEvaluation: uciMessage.match(/cp\s+(-?\d+)/)?.[1], 
      possibleMate: uciMessage.match(/mate\s+(-?\d+)/)?.[1],     
      pv: uciMessage.match(/ pv\s+(.*)/)?.[1],
      depth: Number(uciMessage.match(/ depth\s+(\d+)/)?.[1] ?? 0),
      multipv,
    };
  }

  init() {
    this.stockfish.postMessage('uci');
    this.stockfish.postMessage('isready');
    this.onMessage(({ uciMessage }) => {
      if (uciMessage === 'readyok') {
        this.isReady = true;
      }
    });
  }

  setOption(name: string, value: string | number) {
    this.stockfish.postMessage(`setoption name ${name} value ${value}`);
  }

  evaluatePosition(fen: string, time: number = 2) {
    const timeMs = time * 1000;
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go movetime ${timeMs}`);
  }

  stop() {
    this.stockfish.postMessage('stop');
  }

  terminate() {
    this.isReady = false;
    this.stockfish.postMessage('quit');
  }
}

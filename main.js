'use strict';

(() => {
  const hands = ['グー', 'チョキ', 'パー'];
  const resultText = ['『勝利！』', '『敗北！』', '『あいこ！』'];

  // 値を取得する
  const count = document.getElementById('gameCount');
  let countResult = count.innerHTML; 
  const rock = document.getElementById('rock');
  const scissors = document.getElementById('scissors');
  const paper = document.getElementById('paper');
  const myHandType = document.getElementById('myHand');
  const enemyHandType = document.getElementById('enemyHand');
  const result = document.getElementById('result');
  const reset = document.getElementById('reset');
  const winCount = document.getElementById('winCount')
  const loseCount = document.getElementById('loseCount')
  const winRate = document.getElementById('winRate');

  //試合数、勝ち数、負け数
  let gameCount = 0;
  let winResult = 0;
  let loseResult = 0;

  //試合数書き換え
  const gameCountReplace = (gameCount) => {              
    countResult = countResult.replace(countResult, gameCount);
    count.textContent = countResult;
  }

  const alert = (winResult, loseResult) => {
    if (winResult > loseResult) {
      window.alert('やったー！勝ち越しました！');
    } else if (winResult < loseResult) {
      window.alert('ざんねん！負け越しました！');
    } else {
      window.alert('引き分けでした！');
    }
  }

  //リセットボタン表示とreload()関数呼び出し
  const resetClick = () => {
    //ボタン要素作成
    const resetBtn = document.createElement('input');
    resetBtn.type = 'button';
    resetBtn.value = '更新';
    reset.appendChild(resetBtn); //親要素(reset)の子要素にボタンを配置する

    resetBtn.addEventListener('click', () => { //更新ボタンを押下後、画面リロードする
      location.reload(); 
    })
  }

  //10回到達したらボタンを非活性にする
  const inactive = () => {
    rock.disabled = true;
    scissors.disabled = true;
    paper.disabled = true;
  }

  //勝率計算
  const winRateCalc = (gameCount, winCount) => {
    const winRateResult = (winCount / gameCount) * 100;
    winRate.textContent = `${winRateResult}%`;
  }

  //ボタン押下関数
  const onClick = (event) => {
    const myHand = Number(event.target.value); //取得するvalue値はstring型のため、Number型に変換
    const enemyHand = Math.floor(Math.random() * hands.length);

    myHandType.textContent = `自分：${hands[myHand]}`;
    enemyHandType.textContent = `相手：${hands[enemyHand]}`;

    //勝敗判定
    const handResult = (myHand - enemyHand + 3) % hands.length;

    if (handResult === 2) {
      result.textContent = resultText[0];
      gameCount++;
      winResult++;
      gameCountReplace(gameCount);

    } else if (handResult === 1) {
      result.textContent = resultText[1];
      gameCount++;
      loseResult++;
      gameCountReplace(gameCount);

    } else {
      result.textContent = resultText[2];
    }

    if (gameCount === 10) { //試合数が１０回に到達したら実行される処理
      winCount.textContent = `${winResult}回`;
      loseCount.textContent = `${loseResult}回`;
      winRateCalc(gameCount, winResult);
      alert(winResult,loseResult)
      inactive();
      resetClick();
    }
  }

  // クリックした時の挙動はどのボタンも同じなので、関数を共通化
  rock.addEventListener('click', onClick);
  scissors.addEventListener('click', onClick);
  paper.addEventListener('click', onClick);

})();
// 1. 과거의 데이터를 준비합니다.
var 온도 = [20, 21, 22, 23];
var 판매량 = [40, 42, 44, 46];
var 원인 = tf.tensor(온도);
var 결과 = tf.tensor(판매량);

// 2. 모델의 모양을 만듭니다.
var X = tf.input({ shape: [1] }); //컬럼이 하나인 값 -> 온도는 하나니깐. (입력)
var Y = tf.layers.dense({ units: 1 }).apply(X); // units:1 -> 하나의 값을 출력 (출력)
var model = tf.model({ inputs: X, outputs: Y }); // 모델이라는 변수에 학습과 예측작업을 한다.
var compileParam = {
  optimizer: tf.train.adam(),
  loss: tf.losses.meanSquaredError,
}; //optimizer(효율)과 loss(모델이 잘만들어졌는지 측정)라는 값을 줌
model.compile(compileParam); //모델을 만드는 실질적인 부분.

// 3. 데이터로 모델을 학습시킵니다.
var fitParam = { epochs: 100 }; //학습 횟수.
model.fit(원인, 결과, fitParam).then(function (result) {
  // 4. 모델을 이용합니다.
  // 4.1 기존의 데이터를 이용
  var 예측한결과 = model.predict(원인);
  예측한결과.print(); //예측한 결과는 tensor에서 제공하는거라 .print()작성하여 출력
  // model.save("downloads://my-model");
});

// 4.2 새로운 데이터를 이용
var 다음주온도 = [15, 16, 17, 18, 19];
var 다음주원인 = tf.tensor(다음주온도);
var 다음주결과 = model.predict(다음주원인);
다음주결과.print();

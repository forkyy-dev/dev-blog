---
title: "이펙티브 코틀린 (TDD, 클린코드 with Kotlin) 8기 - 3,4,5주차"
description: ""
date: 2025-01-10
update: 2025-01-10
tags:
  - Nextstep
  - Kotlin
series: "NextStep - Effective Kotlin"
---

## 3주차 미션 회고 - 블랙잭

- [리뷰1](https://github.com/next-step/kotlin-blackjack/pull/712)
- [리뷰2](https://github.com/next-step/kotlin-blackjack/pull/759)
- [리뷰3](https://github.com/next-step/kotlin-blackjack/pull/809)
- [리뷰3](https://github.com/next-step/kotlin-blackjack/pull/816)

가장 어려우면서도 재밌었던 미션이었다.

## 도메인 용어(?)는 중요하다.

블랙잭에는 플레이어의 상태를 나타내는 hit, stay, bust, blackjack 과 같은 개념이 있다.  
처음 구현할때는 일단 저 용어들을 몰랐고 굳이 저 용어를 사용하지 않더라도 비슷한 의미를 가진 용어를 쓰면 되겠지 라는 생각으로 구현했다. 하지만 리뷰어님이 해당 용어들을 사용하는것을 권장하셨고 이를 다음 작업에서 적용했다.

별거 아닌것처럼 보이지만, 해당 도메인에 맞는 용어를 사용함으로써 처음 코드를 보는 사람으로 하여금 더 직관적으로 이해할 수 있게 된다는걸 느꼈다. 현업에서는 협업하는 부서와 함께 도메인 용어들을 미리 정의하고 개발을 진행한다면 훨씬 더 유용할것 같다.

## 테스트코드를 위해 프로덕션 코드를 변경한다?

> 여기서 말하는 변경은 테스트코드를 위해 private 메서드를 public으로 변경하는 등의 작업을 말하는건 아니다.

예를 들어 아래와 같이 객체 생성 후 추후에 데이터가 추가되도록 만들어진 객체가 있다고 가정해보자.

```kotlin
class Cards() {
    private val _group: MutableList<Card> = mutableListOf()
    val group: List<Card> = _group.toList()

    val addCard(card: Card) { ... }
}
```

위의 객체를 활용한 테스트를 작성한다고 하면 아래의 단계가 필수적으로 들어간다.

1. Cards 객체 생성
2. card.addCard() 호출을 통한 카드 등록

하지만 매 테스트마다 이런 작업을 하는건 귀찮다. 이를 해소하기 위해 아래와 같이 변경할 수 있다.

```kotlin
class Cards(cardGroup: List<Card>) {
    private val _group: MutableList<Card> = cardGroup.toMutableList()
    val group: List<Card> get() = _group.toList()
}
```

제이슨과 수현님은 이렇게 "생성자 파라미터의 경우 객체를 초기화하는 전제 조건 주입 목적"에 한해서는 변경을 허용하는 편이라고 하신다. 미리 주입받을 수 있도록 생성자를 만들어 두신다.

나는 개인적으로 차라리 픽스쳐를 만들어두고 사용하는걸 더 선호하는 편인데 이런 관점을 배울 수 있어 신기했다.

## 언제나 가장 중요한건 설계!

블랙잭 게임은 딜러도 게임에 참여하기 때문에 플레이어와 비슷한 동작을 수행한다. 그래서 이 미션의 핵심은 두 객체간의 동일한 동작을 구현하는데 있어서 중복을 제거하는것이다.

실제로 나름 설계에 공을 많이 들였고, 미션이 진행되면서 추가되는 요구사항에 잘 대처할 수 있었다. 물론 역할을 나누고 책임을 부여하는게 쉽지는 않았지만..

추가적으로 제이슨 덕분에 상태패턴이라는것에 대해 알았다.

블랙잭을 상태패턴을 사용해 구현하신 예시를 보여주는데 나는 개발 단계에서 한번도 생각해보지 못한 방식이었기에 꽤 충격을 받았던것 같다. (참고할만한 자료: https://seonghoonc.tistory.com/14#google_vignette)

## 과정을 마무리하며

이번 미션은 꼭 완주하는게 목표였는데 마지막 지뢰찾기 미션은 결국 미루다가 못했다. (연말에는 왜 게을러지는가..)

하지만 이 과정을 통해서 단순히 코틀린이라는 언어에 대한 지식 뿐만 아니라 OOP에 대해 많은 고민을 해볼 수 있었다는 점과 나에게 부족한 부분들을 발견할 수 있었기에 전혀 아깝지 않았다.

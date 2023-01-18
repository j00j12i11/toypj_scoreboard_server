# SCOREBOARD_SERVER

## DATABASE 구조
### 'games' TABLE
| Field | Type | Null | 설명 | 기본값 |
|:---:|:---:|:---:|---:|---:|
| `id` | `int` | No | 고유 식별자(Primary Key) | 이전값 대비 자동으로 증가 |
| `name` | `varchar(15)` | No | 게임명 (15글자 내외) | - |
| `maches` | `smallint unsigned` | YES | 대결한 횟수 | `0` |

#### 'users' TABLE
| Field | Type | Null | 설명 | 기본값 |
|:---:|:---:|:---:|---:|---:|
| `id` | `int` | No | 고유 식별자(Primary Key) | 이전값 대비 자동으로 증가 |
| `name` | `varchar(10)` | No | 이름 (10글자 내외) | - |
| `age` | `tinyint unsigned` | No | 나이 (0~255) | - |
| `gender` | `tinyint(1)` | No | 성별 (여자[Female] = False) | - |
| `win` | `smallint unsigned` | YES | 승리 횟수 | `0` |
| `lose` | `smallint unsigned` | YES | 패배 횟수 | `0` |
#### 'scores' TABLE
| Field | Type | Null | 설명 | 기본값 |
|:---:|:---:|:---:|---:|---:|
| `id` | `int` | No | 고유 식별자(Primary Key) | 이전값 대비 자동으로 증가 |
| `game_id` | `int` | No | 플레이한 game 식별자(Foreign Key) | - |
| `user1_id` | `int` | No | 승리한 user 식별자(Foreign Key) | - |
| `user2_id` | `int` | No | 패배한 user 식별자(Foreign Key) | - |
| `user1_score` | `tinyint unsigned` | No | 승리한 user의 점수 | - |
| `user2_score` | `tinyint unsigned` | No | 패배한 user의 점수 | - |
| `date` | `datetime` | No | 플레이 날짜와 시간 | - |
---
<br>
<br>

## API 설명
code:   
200번대 => 성공   
400번대 => 실패
### games table
+ 조회(READ)
    + id로 game 조회
        + METHOD: `GET`   
        + URL: `/api/v1/games/{id}`
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example about `/api/v1/games/1`
            {
                "status": 200,
                "data": [
                    {
                        "id": 1,
                        "name": "soccer",
                        "maches": 1
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 저장된 모든 game 조회
        + METHOD: `GET`   
        + URL: `/api/v1/games`   
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 1,
                        "name": "soccer",
                        "maches": 1
                    },
                    {
                        "id": 2,
                        "name": "bowling",
                        "maches": 4
                    },
                    {
                        "id": 3,
                        "name": "billiards",
                        "maches": 2
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 저장된 모든 game 조회 + 특정 필드에 대해 정렬(오름차순)
        + METHOD: `GET`   
        + URL: `/api/v1/games?sortBy={'field'}`   
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example about `/api/v1/games?sortBy=maches`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 1,
                        "name": "soccer",
                        "maches": 1
                    },
                    {
                        "id": 3,
                        "name": "billiards",
                        "maches": 2
                    },
                    {
                        "id": 2,
                        "name": "bowling",
                        "maches": 4
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 저장된 모든 game 조회 + 특정 필드에 대해 정렬(내림차순)
        + METHOD: `GET`   
        + URL: `/api/v1/games?sortBy={'field'}&ascending=false`  
        + Request Body:    
            ```
            null
            ``` 
        + Response Body:     
            ```json
            // example about `/api/v1/games?sortBy=id&ascending=false`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 3,
                        "name": "billiards",
                        "maches": 4
                    },
                    {
                        "id": 2,
                        "name": "bowling",
                        "maches": 2
                    },
                    {
                        "id": 1,
                        "name": "soccer",
                        "maches": 1
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 특정 조건과 일치하는 game 조회 ['filed'가 'value'값을 가지는 모든 game]
        + METHOD: `GET`   
        + URL: `/api/v1/games/game?{'field'}={'value'}`   
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example about `/api/v1/games/game?name=bowling`
            {
                "status": 200,
                "data": [
                    {
                        "id": 2,
                        "name": "bowling",
                        "maches": 2
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
+ 생성(CREATE)
    + 새로운 게임 생성
        + METHOD: `POST`   
        + URL: `/api/v1/games`   
        + Request Body:    
            ```json
            {
                "name" : "{game name}"
            }
            ```
        + Response Body:     
            ```json
            // success
            {
                "status" : 201
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
+ 변경(UPDATE)   
    + 특정 id의 모든 필드 일괄 변경   
        + METHOD: `PUT`   
        + URL: `/api/v1/games/{id}`   
        + Request Body:    
            ```json
            {
                "name" : "{new name}",
                "maches" : "{new maches}"
            }
            ```
        + Response Body:     
            ```json
            // success
            {
                "status" : 201
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 특정 id의 하나의 필드만 변경   
        + METHOD: `PATCH`   
        + URL: `/api/v1/games/{id}`   
        + Request Body:    
            ```json
            {
                "name" : "{new name}"
            }
            ```   
            또는
            ```json
            {
                "maches" : "{new maches}"
            }
            ```
        + Response Body:     
            ```json
            // success
            {
                "status" : 201
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
### users table
+ 조회(READ)
    + id로 user 조회
        + METHOD: `GET`   
        + URL: `/api/v1/users/{id}`
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example about `/api/v1/users/1`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 1,
                        "name": "Alex",
                        "age": 23,
                        "gender": 1,
                        "win": 2,
                        "lose": 1
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 저장된 모든 user 조회
        + METHOD: `GET`   
        + URL: `/api/v1/users`   
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 1,
                        "name": "Alex",
                        "age": 23,
                        "gender": 1,
                        "win": 2,
                        "lose": 1
                    },
                    {
                        "id": 2,
                        "name": "Beatrice",
                        "age": 20,
                        "gender": 0,
                        "win": 2,
                        "lose": 2
                    },
                    {
                        "id": 3,
                        "name": "Charles",
                        "age": 28,
                        "gender": 1,
                        "win": 0,
                        "lose": 0
                    },
                    {
                        "id": 4,
                        "name": "Dolores",
                        "age": 25,
                        "gender": 0,
                        "win": 0,
                        "lose": 1
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 저장된 모든 user 조회 + 특정 필드에 대해 정렬(오름차순)
        + METHOD: `GET`   
        + URL: `/api/v1/users?sortBy={'field'}`   
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example about `/api/v1/users?sortBy=age`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 2,
                        "name": "Beatrice",
                        "age": 20,
                        "gender": 0,
                        "win": 2,
                        "lose": 2
                    },
                    {
                        "id": 1,
                        "name": "Alex",
                        "age": 23,
                        "gender": 1,
                        "win": 2,
                        "lose": 1
                    },
                    {
                        "id": 4,
                        "name": "Dolores",
                        "age": 25,
                        "gender": 0,
                        "win": 0,
                        "lose": 1
                    },
                    {
                        "id": 3,
                        "name": "Charles",
                        "age": 28,
                        "gender": 1,
                        "win": 0,
                        "lose": 0
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 저장된 모든 user 조회 + 특정 필드에 대해 정렬(내림차순)
        + METHOD: `GET`   
        + URL: `/api/v1/users?sortBy={'field'}&ascending=false`  
        + Request Body:    
            ```
            null
            ``` 
        + Response Body:     
            ```json
            // example about `/api/v1/users?sortBy=lose&ascending=false`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 2,
                        "name": "Beatrice",
                        "age": 20,
                        "gender": 0,
                        "win": 2,
                        "lose": 2
                    },
                    {
                        "id": 1,
                        "name": "Alex",
                        "age": 23,
                        "gender": 1,
                        "win": 2,
                        "lose": 1
                    },
                    {
                        "id": 4,
                        "name": "Dolores",
                        "age": 25,
                        "gender": 0,
                        "win": 0,
                        "lose": 1
                    },
                    {
                        "id": 3,
                        "name": "Charles",
                        "age": 28,
                        "gender": 1,
                        "win": 0,
                        "lose": 0
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 특정 조건과 일치하는 user 조회 ['filed'가 'value'값을 가지는 모든 user]
        + METHOD: `GET`   
        + URL: `/api/v1/users/user?{'field'}={'value'}`   
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example about `/api/v1/users/user?gender=0`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 2,
                        "name": "Beatrice",
                        "age": 20,
                        "gender": 0,
                        "win": 2,
                        "lose": 2
                    },
                    {
                        "id": 4,
                        "name": "Dolores",
                        "age": 25,
                        "gender": 0,
                        "win": 0,
                        "lose": 1
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
+ 생성(CREATE)
    + 새로운 게임 생성
        + METHOD: `POST`   
        + URL: `/api/v1/users`   
        + Request Body:    
            ```json
            {
                "name" : "{user name}",
                "age" : "{user age}",
                "gender" : "{male = true / female = false}"
            }
            ```
        + Response Body:     
            ```json
            // success
            {
                "status" : 201
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
+ 변경(UPDATE)   
    + 특정 id의 모든 필드 일괄 변경   
        + METHOD: `PUT`   
        + URL: `/api/v1/users/{id}`   
        + Request Body:    
            ```json
            {
                "name" : "{new name}",
                "age" : "{new age}",
                "gender" : "{male = true / female = false}"
            }
            ```
        + Response Body:     
            ```json
            // success
            {
                "status" : 201
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 특정 id의 하나의 필드만 변경   
        + METHOD: `PATCH`   
        + URL: `/api/v1/users/{id}`   
        + Request Body:    
            ```json
            {
                "name" : "{new name}"
            }
            ```   
            또는
            ```json
            {
               "age" : "{new age}"
            }
            ```
            또는
            ```json
            {
               "gender" : "{male = true / female = false}"
            }
            ```
        + Response Body:     
            ```json
            // success
            {
                "status" : 201
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>

### scores table
+ 조회(READ)
    + id로 score 조회
        + METHOD: `GET`   
        + URL: `/api/v1/scores/{id}`
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example about `/api/v1/scores/1`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 1,
                        "game_id": 5,
                        "user1_id": 1,
                        "user2_id": 2,
                        "user1_score": 3,
                        "user2_score": 1,
                        "date": "2022-12-28T02:24:34.000Z"
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 저장된 모든 score 조회
        + METHOD: `GET`   
        + URL: `/api/v1/scores`   
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 1,
                        "game_id": 5,
                        "user1_id": 1,
                        "user2_id": 2,
                        "user1_score": 3,
                        "user2_score": 1,
                        "date": "2022-12-28T02:24:34.000Z"
                    },
                    {
                        "id": 2,
                        "game_id": 3,
                        "user1_id": 2,
                        "user2_id": 4,
                        "user1_score": 9,
                        "user2_score": 4,
                        "date": "2022-12-30T13:45:50.000Z"
                    },
                    {
                        "id": 3,
                        "game_id": 5,
                        "user1_id": 1,
                        "user2_id": 2,
                        "user1_score": 3,
                        "user2_score": 1,
                        "date": "2023-01-05T04:10:41.000Z"
                    },
                    {
                        "id": 4,
                        "game_id": 1,
                        "user1_id": 2,
                        "user2_id": 1,
                        "user1_score": 5,
                        "user2_score": 3,
                        "date": "2023-01-11T06:45:11.000Z"
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 저장된 모든 score 조회 + 특정 필드에 대해 정렬(오름차순)
        + METHOD: `GET`   
        + URL: `/api/v1/scores?sortBy={'field'}`   
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example about `/api/v1/scores?sortBy=game_id`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 4,
                        "game_id": 1,
                        "user1_id": 2,
                        "user2_id": 1,
                        "user1_score": 5,
                        "user2_score": 3,
                        "date": "2023-01-11T06:45:11.000Z"
                    },
                    {
                        "id": 2,
                        "game_id": 3,
                        "user1_id": 2,
                        "user2_id": 4,
                        "user1_score": 9,
                        "user2_score": 4,
                        "date": "2022-12-30T13:45:50.000Z"
                    },
                    {
                        "id": 1,
                        "game_id": 5,
                        "user1_id": 1,
                        "user2_id": 2,
                        "user1_score": 3,
                        "user2_score": 1,
                        "date": "2022-12-28T02:24:34.000Z"
                    },
                    {
                        "id": 3,
                        "game_id": 5,
                        "user1_id": 1,
                        "user2_id": 2,
                        "user1_score": 3,
                        "user2_score": 1,
                        "date": "2023-01-05T04:10:41.000Z"
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 저장된 모든 score 조회 + 특정 필드에 대해 정렬(내림차순)
        + METHOD: `GET`   
        + URL: `/api/v1/scores?sortBy={'field'}&ascending=false`  
        + Request Body:    
            ```
            null
            ``` 
        + Response Body:     
            ```json
            // example about `/api/v1/scores?sortBy=date&ascending=false`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 4,
                        "game_id": 1,
                        "user1_id": 2,
                        "user2_id": 1,
                        "user1_score": 5,
                        "user2_score": 3,
                        "date": "2023-01-11T06:45:11.000Z"
                    },
                    {
                        "id": 3,
                        "game_id": 5,
                        "user1_id": 1,
                        "user2_id": 2,
                        "user1_score": 3,
                        "user2_score": 1,
                        "date": "2023-01-05T04:10:41.000Z"
                    },
                    {
                        "id": 2,
                        "game_id": 3,
                        "user1_id": 2,
                        "user2_id": 4,
                        "user1_score": 9,
                        "user2_score": 4,
                        "date": "2022-12-30T13:45:50.000Z"
                    },
                    {
                        "id": 1,
                        "game_id": 5,
                        "user1_id": 1,
                        "user2_id": 2,
                        "user1_score": 3,
                        "user2_score": 1,
                        "date": "2022-12-28T02:24:34.000Z"
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 특정 조건과 일치하는 score 조회 ['filed'가 'value'값을 가지는 모든 score]
        + METHOD: `GET`   
        + URL: `/api/v1/scores/score?{'field'}={'value'}`   
        + Request Body:    
            ```
            null
            ```
        + Response Body:     
            ```json
            // example about `/api/v1/scores/score?user1_id=2`
            {
                "sataus": 200,
                "data": [
                    {
                        "id": 2,
                        "game_id": 3,
                        "user1_id": 2,
                        "user2_id": 4,
                        "user1_score": 9,
                        "user2_score": 4,
                        "date": "2022-12-30T13:45:50.000Z"
                    },
                    {
                        "id": 4,
                        "game_id": 1,
                        "user1_id": 2,
                        "user2_id": 1,
                        "user1_score": 5,
                        "user2_score": 3,
                        "date": "2023-01-11T06:45:11.000Z"
                    }
                ]
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
+ 생성(CREATE)
    + 새로운 게임 생성
        + METHOD: `POST`   
        + URL: `/api/v1/scores`   
        + Request Body:    
            ```json
            {
                "game_id" : "{game's id}",
                "user1_id" : "{win user's id}",
                "user2_id" : "{lose user's id}",
                "user1_score" : "{win user's score}",
                "user2_score" : "{lose user's score}",
                "date" : "{YYYY/MM/DD hh:mm:ss}"
            }
            ```
        + Response Body:     
            ```json
            // success
            {
                "status" : 201
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
+ 변경(UPDATE)   
    + 특정 id의 모든 필드 일괄 변경   
        + METHOD: `PUT`   
        + URL: `/api/v1/scores/{id}`   
        + Request Body:    
            ```json
            {
                "game_id" : "{game's id}",
                "user1_id" : "{win user's id}",
                "user2_id" : "{lose user's id}",
                "user1_score" : "{win user's score}",
                "user2_score" : "{lose user's score}",
                "date" : "{YYYY/MM/DD hh:mm:ss}"
            }
            ```
        + Response Body:     
            ```json
            // success
            {
                "status" : 201
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
    + 특정 id의 몇몇 필드 변경(여러개 가능) 
        + METHOD: `PATCH`   
        + URL: `/api/v1/scores/{id}`    
        <span style="color: #ffa0a0"> <b> 단 항상 user1이 승자(점수가 더 높음)!! </b> </span> 
        + Request Body:    
            ```json
            {
                "game_id" : "{game's id}",
                "user1_id" : "{win user's id}",
                "user2_id" : "{lose user's id}",
            }
            ```   
            또는
            ```json
            {
               "age" : "{new age}"
            }
            ```
            또는
            ```json
            {
               "gender" : "{male = true / female = false}"
            }
            ```
        + Response Body:     
            ```json
            // success
            {
                "status" : 201
            }
            ```
            ```json
            // fail
            {
                "status" : 400
            }
            ```
        <br>
  
# 📦 AG Grid

- 🏡 홈페이지 : [https://www.ag-grid.com/](https://www.ag-grid.com/)
- 📚 문서 : [https://www.ag-grid.com/javascript-data-grid/getting-started/](https://www.ag-grid.com/javascript-data-grid/getting-started/)
- 🌍 GitHub : [https://github.com/ag-grid/ag-grid](https://github.com/ag-grid/ag-grid)

AG Grid는 JavaScript로 작성된 **데이터 테이블 UI 컴포넌트** 입니다.  

현재 공식 홈페이지에서 `React`, `Angular`, `Vue`, `Vanilla JS` 등 다양한 프레임워크에서 사용 가능하도록 버전별로 문서를 제공하고 있으며, `Community(무료)`버전과 `Enterprise(유료)` 버전으로 나누어 사용 가능합니다.  

현재 프로젝트는 `AG Grid Community v32.2.1`이며, 이중 몇 개의 기능을 설명할 예정입니다.  
<br>

## 프로젝트 구성 개요

- `index.html` : 메인 AG Grid 페이지
- `index.js` : 그리드 작업을 위한 JS 파일
- `AG_GRID_LOCALE_KR.js` : 그리드 한글 패치 파일
- `CustomineerHeader.js` : 그리드 타이틀에 아이콘 삽입을 위한 JS 형식의 파일

<br>

## AG Grid 설치

AG Grid는 다음과 같은 네 개의 번들 파일을 제공하고 있습니다.  

| 파일명 | 설명 | **CSS 포함 여부** | 압축 여부 |
|:------|:------|:----:|:------:|
| `ag-grid-community.js` | 일반 개발용 전체 버전 | ✅ 포함 | ❌ 미압축 |
| `ag-grid-community.min.js` | 프로덕션용 압축 버전 | ✅ 포함 | ✅ 압축 |
| `ag-grid-community.noStyle.js` | 스타일 제외된 개발용 전체 버전 | ❌ 미포함 | ❌ 미압축 |
| `ag-grid-community.min.noStyle.js` | 💡스타일 제외된 압축 버전 | ❌ 미포함 | ✅ 압축 |

<br>

**스타일이 포함되지 않은 버전(noStyle)**을 사용할 경우, 개별 혹은 AG Grid에서 제공하는 CSS 파일을 가져와 따로 로딩해야 합니다.  

현재 프로젝트에서는 `ag-grid-community.min.noStyle.js`를 사용하여 CSS코드를 개별 적용하였습니다.  

하단은 해당 버전을 CDN으로 불러오는 방법입니다.

```html
<!-- AG Grid JS  -->
<script src="https://cdn.jsdelivr.net/npm/ag-grid-community@32.2.1/dist/ag-grid-community.min.noStyle.js"></script>

<!-- AG Grid 구조 CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@32.2.1/styles/ag-grid.css">
<!-- AG Grid input CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@32.2.1/styles/ag-theme-alpine.css">
```

<br>

**현재 프로젝트**는 `AG Grid Community v32.2.1`을 설치하여 사용 중입니다.  

- **NPM 32.2.1 버전** 설치
```bash
npm install ag-grid-community@32.2.1
```

- 설치된 파일 불러오기
```html
<!-- /node_modules/ag-grid-community/dist에 저장된 js 파일 불러오기 -->
<script src="./node_modules/ag-grid-community/dist/ag-grid-community.min.noStyle.js"></script>

<!-- /node_modules/ag-grid-community/styles에 저장된 css 파일 불러오기 -->
<link rel="stylesheet" href="./node_modules/ag-grid-community/styles/ag-grid.css">
<link rel="stylesheet" href="./node_modules/ag-grid-community/styles/ag-theme-alpine.css">
```

<br>

+) AG Grid에서 제공하는 [Theme Builder](https://www.ag-grid.com/theme-builder/)를 사용하면 보다 쉽게 스타일을 변경할 수 있습니다.  

이후 요소와 옵션을 설정 후, `agGrid.createGrid()`를 통해 AG Grid를 `<div>` 형식으로 렌더링 합니다.

```js
// 1. 그리드 옵션 설정
const gridOptions = {};

// 2. AG Grid를 적용시킬 요소 선택
const myGridElement = document.querySelector('#myGrid');

// 3. AG Grid 생성
const grid = agGrid.createGrid(myGridElement, gridOptions);
```

<br><br>

# 🚀 AG Grid 사용법

### &nbsp;&nbsp;&nbsp; 📕 목차

1. &nbsp;[AG Grid 구성]()
2. &nbsp;[columnDefs]()

<br>

## 1. AG Grid 구성

AG Grid는 행열(Columns & Rows)로 구성되어있습니다.  

행은 `columnDefs`로 열은 `rowData` 옵션을 통해 값을 추가할 수 있으며 각각의 속성 또한 커스텀 가능합니다.   

```js
const gridOptions = {
    // 열(Rows) 데이터 예시
    rowData: [
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ],
    // 행(Columns) 예시
    columnDefs: [
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]
};
```

<br>

## 2. columnDefs

그리드에서 사용할 타이틀(`'<table>에서 <th>역할'`)을 정의할 수 있습니다.  
`columnDefts`은 **배열안의 객체** 형태로, 각 속성값을 바탕으로 배열 순서대로 그리드에 표시됩니다.  

개별 값은 `columnDefs에` 공통 값은 `defaultColDef`로 작성하여 관리할 수 있습니다.

열 객체의 기본 형태는 `{ field: "field-01" }`로, 
이후 열을 그룹으로 나누거나 묶고싶다면 `children` 속성을 사용하여 
`[{ field: "model", children: [ {field : 'A', pinned: "left"}, {field : 'B'}] }]`와 같이 구성할 수 있습니다.  

- 예시
```js
const columnDefs = [
    { field: "price2" },
    { field: "make" },
    { field: "model", children: [ {field : 'A', pinned: "left"}, {field : 'B'}] },
    { field: "price" },
    { field: "electric" }
]

const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
        filter: true
    }
}
```

| 옵션 | 타입 | 기본값 | 역할 |
| :------------------------ | :---------: | :--------: | :-------------------------------------- |
| [field]() | `String` | 없음 | 컬럼 구분, 동작 정의 |
| [colId]() | `String` | 없음 | 컬럼 구분, 동작 정의 |
| [headerName]() | `String` | `field` 값 사용 | 제목 표시 |
| [editable]() | `Boolean` | `false` | 인라인 편집 활성화 |
| [resizable]() | `Boolean` | `false` | 너비 조절 가능 여부 |
| [flex]()                  | `Number`               | 없음        | 통 가능 너비를 비율으로 계산                        |
| [sortable]() | `Boolean` | `false` | 정렬 기능 활성화 |
| [sort]() | `"asc"` or `"desc"` | 없음 | 초기 정렬 방향 지정, `sortable: true`와 함께 써야 의미 있음 |
| [filter]()                | `String` or `Boolean`  | `false`   | 필터 클래식 지정 (가장 많이 쓰임)                    |
| [floatingFilter]()        | `Boolean`              | `false`   | 필터 헤더키 아래에 입력 컨텐츠 표시                    |
| [pinned]()                | `"left"` or `"right"`  | 없음        | 컬럼을 방향에 고정                              |
| [lockPosition]()          | `"left"` or `"right"`  | 없음        | 컬럼을 작업으로부터 가능성 모두 목적으로 고정               |
| [suppressMovable]()       | `Boolean`              | `false`   | 컬럼 이동 비활성화 (클릭 모델로 이동 불가)               |
| [headerClass]()           | `String` or `Function` | 없음        | 헤더 엔드에 컨텐츠의 클래시 적용                      |
| [headerComponent]()       | `Class` or `Function`  | 없음        | 헤더 UI 컨텐츠 카운터링 (보통 React 또는 JS)         |
| [headerComponentParams]() | `Object`               | 없음        | 해당 headerComponent에 전달할 사용자 컨텐츠         |
| [suppressStickyLabel]()   | `Boolean`              | `false`   | pinned header의 sticky label 제거          |
| [cellClass]()             | `String` or `Function` | 없음        | 셀에 클래시 적용 (e.g. "text-center")          |
| [cellStyle]()             | `Object` or `Function` | 없음        | 셀에 인라인 스타일 적용 (e.g. `{ color: 'red' }`) |
| [enableSorting]()         | `Boolean`              | `false`   | 그리드 전체에서 정렬 기능 허용 여부 (전개적 설정)           |

---

### field, colId

AG Grid는 컬럼을 구분하거나 동작을 정의하기위해 `field`와 `colId`를 사용합니다.  

두 개의 역할이 비슷하지만 필수 여부 등 용도가 다르기 때문에 확실히 구분해야합니다.

| 속성 | 필수 여부 | 용도 | 비고 |
|:----|:----|:----|:----|
| `field` | ✅ 거의 필수 | 행(`rowData`)의 해당 키와 바인딩 하기 위한 속성 | 셀 값 출력, 필터, 정렬 등 대부분 기능과 연결 |
| `colId` | ❌ 선택 | **"컬럼의 고유 ID"** <br> - `colId` 값이 없을 경우 그리드는 `field` 값을 사용 <br> - 만약 `field`값이 중복될 경우 필요에 따라 양수값을 붙여 생성(추천X) | 주로 `getColumn()`, `columnApi`, `state 복원` 등에 사용 |

```js
const columnDefs = [
    {
        field : "test",
        colId : "test=01"
    }
]
```

---

### headerName

`headerName`을 지정하면 각 행의 제목에 어떤 텍스트가 입력될지 지정할 수 있습니다.  

`headerName`이 없을 경우 `field` 명으로 자동 세팅됩니다.  

```js
const columnDefs = [
    {
        headerName : "테스트 제목"
    }
]
```

---

### editable

컬럼 값을 수정할 수 있도록 할지에 대한 여부를 설정할 수 있습니다.  

기본값은 `false`로 `true`로 설정해주지 않을 경우 사용자는 그리드 내에서 수정이 불가능합니다.

```js
const columnDefs = [
    {
        editable : false // 사용자 편집 불가능
    }
]
```

---

### resizable

`columnDefs` 에서는 `width`나 `flex`등과 같이 넓이를 지정하는 속성들이 있습니다.  

`resizable`은 이렇게 생성된 이후 사용자가 마우스 드레그를 통해 각 행의 넓이를 조절할 수 있게 할지를 지정하는 옵셥입니다. 

```js
const columnDefs = [
    {
        resizable : true // 넓이 조절 가능
    }
]
```

---

### flex

컬럼에 가변 너비를 적용시키는 옵션입니다.  

그리드 전제 넓이에 flex 옵션값을 비율값으로 자동 계산하여 각 컬럼에 너비를 지정합니다.  

```js
const columnDefs = [
    // test01과 text02가 1:2의 비율로 넓이 차지
    {
        field : "text01",
        flex : 1
    },
    {
        field : "text02",
        flex : 2
    }
]
```

---

### sortable, sort

AG Grid는 header를 클릭하면 `오름차순`, `내림차순`, `기본` 순으로 정렬되는 기능을 제공하고 있습니다.  

기본값은 `false`로 클릭 시 아무일도 발생하지 않지만, `true`로 설정할 경우 해당 기능을 사용할 수 있습니다.  

```js
const columnDefs = [
    {
        sortable : true // 자동 정렬 기능 활성화
    }
]
```

`sort` 옵션을 사용하면 초기에 정렬된 상태로 출력됩니다.  

오름차순으로 정렬하고 싶을 경우 `"asc"`로, 내림차순으로 정렬하고 싶을 경우 `"desc"`로 속성값을 설정하면 됩니다.  

`sort` 속성은 `sortable : true`와 함께 사용되어야합니다.  

```js
const columnDefs = [
    {
        sortable : true, // 자동 정렬 기능 활성화
        sort : "asc" // 초기값 : 오름차순
    }
]
```

+) `comparator`로 커스텀 비교기 만드는 방법 : [링크](https://www.ag-grid.com/javascript-data-grid/row-sorting/)

+) [행 정렬 기준](https://www.ag-grid.com/javascript-data-grid/row-sorting/) 

---

### filter, floatingFilter

`filter` 에서 필터링에 사용될 컨트롤을 설정할 수 있습니다.  

`filter : true`로 설정하면 기본적으로 `filter : agTextColumnFilter`로 설정됩니다.  

직접 필터링 컨트롤을 만들어 연결시키는 것도 가능합니다.  

```js
const columnDefs = [
    {
        filter : true
    }
]
```

`floatingFilter`는 필터링 할 수 잇는 입력 컨텐츠를 표시 여부를 정하는 속성입니다.  

`floatingFilter : true`로 설정될 경우 제목 아래에 input[type="text"]형태의 입력 폼이 추가됩니다.  

```js
const columnDefs = [
    {
        filter : true,
        floatingFilter: true
    }
]
```

---

### pinned

`pinned` 속성이 적용되면 해당 칼럼은 값에 따라 좌측 혹은 우측에 고정됩니다.  

예시로 `text01`에 `pinned : "left"`라는 값이 추가됐다면 해당 그리드는 좌측과 우측으로 구성이 분리되며, 좌우 스크롤의 폭이 `pinned`가 적용된 그리드를 제외한 너비로 축소됩니다.  

```js
const columnDefs = [
    {
        field : "text01",
        pinned : "left"
    },
    {
        field : "text02",
    },
]
```

---

### lockPosition

`lockPosition`은 칼럼의 위치를 가장 왼쪽 혹은 오른쪽으로 옮기도록 합니다.  
`lockPosition : left`로 지정했을 경우 이전 컬럼을 무시하고 가장 왼쪽으로 해당 컬럼의 위치가 이동합니다.  
해당 속성을 적용시켰을 경우, [`suppressMovable: true`]()처럼 드레그를 통한 위치 변경을 막습니다. 

+) gridOptions에서 `rowSelection`을 통해 checkbox를 만들경우 해당 옵션을 같이 사용하면 위치 오류가 발생할 수 있습니다.

---

### suppressMovable

해당 컬럼의 이동을 막을 수 있는 옵셥입니다.  
`suppressMovable: true`로 설정되면 해당 칼럼은 드레그하여 위치를 옮길 수 없습니다.  

다만, 양옆의 컬럼이 움직이는 것이 허용되어 있다면 양옆 컬럼이 움직여 해당 컬럼의 위치가 바뀔 수는 있습니다.  
모든 컬럼을 움직이지 못하도록 막고싶다면 [`defaultColDef`]()에서 `suppressMovable: true`로 설정하는 것이 좋습니다.

---

### headerClass, cellClass

`headerClass`나 `cellClass`를 사용하면 관련 요소에 class를 부여할 수 있습니다.  
`headerClass`를 사용하면 제목이 들어가는 `<div role="columnheader"></div>` 요소에, `cellClass`를 사용하면 내용이 들어가는 `<div role="gridcell"></div>`에 class가 추가됩니다.

```js
const columnDefs = [
    {
        headerClass: 'text-center',
        cellClass: 'shaded-class'
    }
]
```

`cellClassRules: {"text-red": params => params.value === "ERROR"}`와 같이 들어갈 class의 규칙도 정의할 수 있습니다. 

---

### headerStyle, cellStyle

`headerStyle`, `cellStyle`를 사용하면 관련 요소에 style을 추가할 수 있습니다.  
`headerClass`를 사용하면 제목이 들어가는 `<div role="columnheader"></div>` 요소에, `cellClass`를 사용하면 내용이 들어가는 `<div role="gridcell"></div>`에 인라인 스타일이 적용됩니다.


```js
const columnDefs = [
    {
        headerStyle: { backgroundColor: "blue" },
        cellStyle: { cursor: "pointer", color: "pink" }
    }
]
```

--- 

### headerComponent, headerComponentParams

`headerComponent`는 헤더 셀을 커스텀마이징할 수 있도록 돕는 사용자 정의 컴포넌트입니다.  
`columnDefs`내 컬럼 정의에서 해당 컴포넌트를 연결하여, `headerComponentParams`를 매개변수로 받아 사용합니다. 

```js
// CustominnerHeader.js 에서 다음과 같이 정의
export class CustomInnerHeader {
    init(params) {
      this.eGui = document.createElement('div');
      this.eGui.classList.add('custom-inner-header');
  
      const icon = document.createElement('i');
      icon.classList.add('fas', params.icon || 'fa-user'); // 아이콘 클래스 추가
      icon.style.marginRight = '6px';
  
      const text = document.createElement('span');
      text.textContent = params.displayName;
  
      this.eGui.appendChild(icon);
      this.eGui.appendChild(text);
    }
  
    getGui() {
      return this.eGui;
    }
  
    refresh(params) {
      this.eGui.querySelector('span').textContent = params.displayName;
      return true;
    }
  }

// index.js 에서 다음과 같이 import 후 사용
import { CustomInnerHeader } from './CustomInnerHeader.js';

const columnDefs = [
    {
        headerComponent: CustomInnerHeader,
        headerComponentParams:{
           icon: "fa-user",
        },
    }
]
```

`headerComponent`는 단일 컬럼에서만 적용이 가능하며, 그룹 컬럼(`children`)에서는 사용이 불가능합니다. 

<br><br>

## 3. rowData

`rowData`는 그리드 뿌려질 데이터 배열로, `Row Node` 객체로 구성되어 있습니다.  
`columnDefs`의 `field` 값과 `Row Node` 객체의 `키` 값이 1:1 매칭되어 벨류 값이 그리드 셀에  뿌려집니다.   
따라서, `rowData` 실제 데이터 값만을 가지며 설정값을 추가하고 싶다면, `columnDefs`와 달리 `gridOptions`에서 설정해야합니다.  

```js
const columnDefs = [
    {field: "price"},
    {field: "make"}
]

const rowData = [
    {price: "64950", make: "Tesla"},
    {price: "33850", make: "Ford"}
]
```

만약 아래와 같이 `columnDefs` 값이 묶여있다면 `점(.) 표기법` 혹은 `children`을 사용하여 키값을 연결할 수 있습니다. 

- 1. children

```js
const columnDefs = [
    {
        field: "model", 
        children: [ 
            { field: "a" }, 
            { field: "b" }
        ]
    }
]

const rowData = [
    {
        model: {
            a: "Model Y", 
            b: "Model K"
        }
    }
]
```

- 2. 점(.) 표기법

```js
const columnDefs = [
    { field: "model.a" },
    { field: "model.b" }
]

const rowData = [
    {
        model: {
            a: "Model Y", 
            b: "Model K"
        }
    }
]
```

---

### 행 노드

그리드에 표시되는 각 행은 `Row Node`로 표현되며, `AG Grid`는 행과 직접 상호 작용할 수 있는 상태 속성과 메서드를 제공하고 있습니다.  
행 노드는 `Grid API` 메서드를 통해 접근되며, [`Cell Component`](https://www.ag-grid.com/javascript-data-grid/component-cell-renderer/)와 같은 항목에 대한 속성으로 제공됩니다.  

아래는 현재 항목의 몇가지 값을 가져오는 예시입니다.

- `HTML` 예시
```html
<div id="myGrid"></div>
<button onClick="getAllRows()"></button>
```

- `JavaScript` 예시
```js
const columnDefs = [
    { field: "make" },
    { field: "model" }
]

const rowData = [
    { id: "test-01", make: 'Tesla', model: 'Model Y'},
    { id: "test-02", make: 'Ford', model: 'F-Series'}
]

const gridOptions = [
    columnDefs: columnDefs,
    rowData: rowData,
    getRowId: (params) => String(params.data.id),
]

const myGridElement = document.querySelector('#myGrid');

const grid = agGrid.createGrid(myGridElement, gridOptions);

function getAllRows(){
    grid.forEachNode((rowNode)=>{
        console.log(`-------------------------`);
        console.log(`id: ${rowNode.id}`);
        console.log(`rowIndex: ${rowNode.rowIndex}`);
        console.log(`data: ${JSON.stringify(rowNode.data)}`);
        console.log(`group: ${rowNode.group}`);
        console.log(`height: ${rowNode.rowHeight}px`);
        console.log(`isSelected: ${rowNode.isSelected()}`);
        console.log(`-------------------------`);
    });
}
```

- 콘솔 실행 결과
```console
-------------------------
id: test-01
rowIndex: 0
data: { id: "test-01", make: "Tesla", model: "Model Y"}
group: false
height: 42px
isSelected: false
-------------------------
-------------------------
id: test-02
rowIndex: 1
data: { id: "test-02", make: "Ford", model: "F-Series"}
group: false
height: 42px
isSelected: false
-------------------------
```

+) [Row Interface](https://www.ag-grid.com/javascript-data-grid/row-interface/), [Row Object](https://www.ag-grid.com/javascript-data-grid/row-object/)

---

### valueGetter

`columnDefs` 에서 [`valueGetter`](https://www.ag-grid.com/javascript-data-grid/value-getters/)를 사용하면 `rowData`을 거치지않고 셀 안에 값을 입력할 수 있습니다.  
이때, `rowData`와 `columnDefs`가 키값으로 1:1 매칭이 되는 것이 아니기 때문에, `field`값이 필수가 아니게 됩니다.   
대신 `headerName`으로 제목에 넣을 텍스트를 작성하고 `valueGetter`로 해당 셀에 들어갈 콜백함수를 추가합니다.  

```js
const columnDefs = [
   { 
       headerNmae: "id",
       valueGetter: (params) => {
           return params.node ? Number(params.node.id) : null;
       }
   }
]
```

---

### getRowId

각 행에 고유 ID를 추가할 수 있습니다.  
문자열을 반환하는 함수를 `getRowId`에 전달하면 해당 행에 `row-id` 속성이 추가됩니다.  

- `rowData` 배열에 `id` 값을 추가한 뒤, `getRowId`에 전달
```js
// 각 행에 id 키값 추가
const rowData = [
    { id: 'test-01', make: 'Tesla'}
]

const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    getRowId: (params) => String(params.data.id) // 추가한 id 값 출력
}
```

- 실행 결과
```html
<div role="row" row-id="test-01"></div>
```
---

### getRowNode, forEachNode, forEachNodeAfterFilter, forEachNodeAfterFilterAndSort

AG Grid는 그리드에 데이터를 설정하면, 각 데이터 항목을 `Row Node` 객체로 래핑합니다.  
모든 행은 `Row Node`형태로 내부에 저장되며, AG Grid는 이러한 노드를 순회할 수 있도록 다양한 메서드를 제공합니다.
(`JavaScript`의 `forEach`와 유사)

- getRowNode() : 주어진 ID를 기반으로 동일한 ID를 가진 `Row Node`를 반환합니다. 
이때 ID는 `getRowID` 함수로 지정된 고유 식별자며, 없을 경우 자동 생성된 숫자를 문자열로 변환하여 각 행에 부여합니다.  

```js
// rowId는 rowData 항목의 id 속성에서 가져오도록 설정
const gridOptions = {
  getRowId: params => params.data.id,
  rowData: [ { id: 'row-1', name: 'John' }, { id: 'row-2', name: 'Jane' } ],
  columnDefs: [ { field: 'name' } ]
};

// 특정 RowNode를 가져오기
const rowNode = gridOptions.api.getRowNode('row-1');
console.log(rowNode.data.name); // "John"
```

- forEachNode() : 숨겨진행, 필터에 의해 제외된 행 등도 포함된 모든 노드를 순회합니다. 
무한 행 모델을 사용하는 경우, 페이지 캐시에 로드된 각 페이지에 대해 이 메서드가 호출됩니다.

```js
gridOptions.api.forEachNode(node => {
  console.log(node.data);
});
```

- forEachNodeAfterFilter() : 필터링된 데이터를 제외한 모든 노드를 순회하며 콜백을 호출합니다. 정렬 순서는 무시하고 원래 순서대로 순회합니다.

```js
gridOptions.api.forEachNodeAfterFilter(node => {
  console.log(node.data);
});
```
- forEachNodeAfterFilterAndSort() : 필터링된 데이터를 제외한 모든 노드를 순회하며 콜백을 호출합니다. 정렬이 적용된 경우, 화면에 표시된 순서대로 `Row Node`를 순회합니다.

```js
gridOptions.api.forEachNodeAfterFilterAndSort((node, index) => {
  console.log(`${index + 1}. ${node.data.name}`);
});
```

---

### rowClass, getRowClass, rowClassRules

`rowClass`, `getRowClass`, `rowClassRules`를 사용하면 각 행에 class를 추가할 수 있습니다.  

- `rowClass`: `문자열(String)` 혹은 `문자열 배열`을 값으로 받아 **모든 행에 동일한 class를 부여**합니다.  

- `getRowClass`:  **콜백 함수**를 통해 각 행에 따라 **개별적으로 클레스를 부여**하는 방법입니다. 반환되는 값의 형태는 `문자열`, `문자열 배열`, class를 넣고 싶지 않은 경우 `undefined`여야합니다.  

- `rowClassRules`: **class가 포함되는 규칙을 정의**할 수 있습니다. 배열 형태로 구성되어 있으며, `key`가 `클레스명`이고 `value`가 `표현식`입니다. 표현식을 통과 했을 때 `true`를 반환하는 규칙은 **클래스를 추가**하고, `false`를 반환하는 규칙은 **클레스를 제거**합니다.

- 📋 함수의 매개변수는 하단의 [Row Class/Style Functions]()를 참고하세요.

```js
const gridOptions = {
    // 모든 행에 row-class 클래스 명 추가하기
    rowClass: "row-class",

    // 모든 짝수 행에 even-row-class 클래스 명 추가하기
    getRowClass: (params) => {
        if(params.node.rowIndex % 2 === 0){
            return "even-row-class";
        }
    },

    // 조건을 충족할 경우 해당 클래스 명 추가하기
    rowClassRules: {
        // make가 Tesla일 경우 Tesla-class 클래스 명 추가
        "Tesla-class": (params) => {return params.data.make === "Tesla"},

        // make가 Tesla일 경우 Ford-class 클래스 명 추가
        "Ford-class": (params) => {return params.data.make === "Ford"},
    }
}
```

+) 공식 문서 : [링크](https://www.ag-grid.com/javascript-data-grid/row-styles/)

---

### rowStyle, getRowStyle

행(Row)에 CSS 스타일을 추가하고 싶다면 `rowStyle`, `getRowStyle`를 사용하면 됩니다.  

- `rowStyle`: 객체로 키(스타일 이름)과 값(스타일 값)을 전달하면 해당 스타일이 전체 행에 적용됩니다.  

- `getRowStyle`:  각 행에 조건에 따라 스타일을 설정하는 콜백 함수입니다. 해당 함수는 CSS 값이 들어간 객체를 반환하거나, 스타일을 넣고 싶지 않은 경우 `undefined`를 반환해야합니다.  

- 📋 함수의 매개변수는 하단의 [Row Class/Style Functions]()를 참고하세요.

```js
const gridOptions = {
    // 모든 행의 배경색을 흰색으로
    rowStyle: { backgroundColor: "White" },

    // 짝수 행의 배경색을 빨간색으로
    getRowStyle: (params) => {
        if(params.node.rowIndex % 2 === 0){
            return { backgroundColor: "red" };
        }
    }
}
```

---

### Row Class/Style Functions

모든 `rowStyle`, `rowClass` 및 `rowClassRules` 함수는 `RowClassParams`라는 params 객체를 사용하였습니다.  

`RowClassParams` 객체는 다음과 같은 속성을 포함하고 있습니다.  

| 속성명 | 타입 | 설명 |
|:----|:----:|:----|
| data | `TData` or `undefined` | `data`는 해당 행에 바인딩된 실제 데이터가 반환됩니다. 만약 AG Grid에서 row grouping 기능을 사용하면 그룹 헤더 역할을 하는 `row group row`들이 생성되는데 이 경우 `undefined`값이 반환될 수 있습니다.  |
| node | `IRowNode` | 해당 행과 관련된 `RowNode 객체`를 반환합니다. 고유 ID, 선택 상태, 그룹 여부 등 다양하나 정보가 포함되어 있습니다. |
| rowIndex | `Number` | 해당 행의 인덱스 번호를 반환합니다.(0부터 시작) |
| api | `GridApi` | AG Grid 전체에 대한 API에 접근할 수 있습니다. |
| context | `TContext` | `gridOptions.context`에 설정한 전역 공유 객체로, 외부 설정값이나 전역 상태를 공유할 때 사용됩니다. |

행을 새로고침하거나 셀을 편집하여 업데이트하면, `rowStyle`, `rowClass` 및 `rowClassRules` 모두 다시 적용됩니다. 이 경우 다음과 같은 결과가 나타날 수 있습니다.

- `rowStyle` : 새 스타일이 이전 스타일과 동일하면 새 스타일이 이전 스타일을 덮어씁니다.
- `rowClass` : 기존 클래스가 삭제되지 않은 상태에서 클래스가 새로 누적됩니다. 기존 클래스를 삭제하려면 `rowClassRules`를 사용해야 합니다.
- `rowClassRules` : `true`를 반환하는 규칙은 한번 더 클래스를 적용하고, `false`를 반환하는 규칙은 한번 더 클래스를 제거합니다.

---

### rowHeight, getRowHeight, setRowHeight, onRowHeightChanged

[`rowHeight`](https://www.ag-grid.com/javascript-data-grid/row-height/)로 행의 높이를 변경할 수 있습니다.  

기본적으로 정수를 넓기면 해당 값으로 높이가 변경되지만, 각 행의 높이를 개별적으로 설정하고 싶다면 `getRowHeight` 콜백함수를 통해 조건부 정수를 반환하도록 하면 됩니다.

- `rowHeight` 사용 시
```js
const gridOptions = {
    rowHeight: 50, // 모든 행의 50px로 높이 설정
    getRowHeight: params => params.data.make === "Tesla" ? 50 : 20 // make 행의 셀값이 Tesla일 경우 높이 50px, 아닐 경우 20px 
}
```

이렇게 초반에 높이가 설정되면 그리드에서는 행 높이를 다시 묻지 않습니다.  

처음 설정 이후 변경하고 싶다면  [setRowHeight, onRowHeightChanged](https://www.ag-grid.com/javascript-data-grid/row-height/)를 사용하여 변경하면 됩니다. 

---

### suppressRowHoverHighlight, columnHoverHighlight

그리드에 마우스를 올렸을 때, 해당 행이나 열의 색상이 바뀌며 강조됩니다.  
기본적으로 행 강조는 켜져있고, 열 강조는 꺼져있습니다.  

아래 속성값을 `true`로 줄 경우 행 강조는 꺼지고 열 강조는 켜집니다.

- 행 강조 끄고 싶을 때 : `suppressRowHoverHighlight: true`
- 열 강조 키고 싶을 때 : `columnHoverHighlight: true`

```js
const gridOptions = {
    suppressRowHoverHighlight: true,
    columnHoverHighlight: true
}
```

---

### rowDrag

마우스 드래그하여 행을 위치를 옮길 수 있도록 설정할 수 있습니다.  
여러가지 조건과 제약사항이 많아 다음 [문서](https://www.ag-grid.com/javascript-data-grid/row-dragging/)를 참고하여 사용해야합니다.  


<br><br>

## 4. pagination

`pagination: true` 속성을 사용하면 자동으로 페이지가 분할되며 관련 창이 생성됩니다.  

```js
const gridOptions = {
    pagination: true
}
```

AG Grid에서 제공하는 기능은 다음과 같습니다.

### Pagination Properties

| 속성 | 타입 | 초기값 | 설명 |
|:----|:----:|:----:|:----|
| pagination | `Boolean` | `false` | 페이지네이션 기능을 활성화 |
| paginationAutoPageSize | `Boolean` | `false` | `true로` 설정 시, 그리드 크기에 맞춰 자동으로 `paginationPageSize를` 계산 |
| paginationPageSize | `Number` | 100 | 페이지당 표시할 행(row) 수를 지정 |
| paginationPageSizeSelector | `[Number]` / `Boolean` | `[]` / `true` | 사이즈 선택 박스. 배열로 페이지 수 옵션을 지정하거나 true로 전체 선택을 허용 |
| paginateChildRows | `Boolean` | `false` | true로 설정 시, 마스터-디테일이나 트리 데이터의 자식 행도 함께 페이지네이션에 포함됨 |
| suppressPaginationPanel | `Boolean` | `false` | true로 설정 시, 기본 페이지네이션 패널(UI)이 표시되지 않음. 발자가 직접 UI를 구성할 때 사용 |

<details>
<summary>paginationAutoPageSize</summary>

---

해당 그리드 사이즈에 맞춰 들어갈 수 있는 최대 개수의 행이 자동으로 표시됩니다.  
영역의 크기를 조정하면 페이지 크기도 자동으로 변경되지만, 만약 [getRowHeight]()와 같은 콜백을 통해 동적으로 행높이가 변경되는 경우, 실제 행 높이가 아닌 기본 행높이를 사용하여 계산되니 주의해야합니다.  

`pagination: true` 의 페이지네이션 창과 달리 **`paginationPageSizeSelector`(페이지 개수를 선택하는 드롭다운 선택기)가 사라집니다(무시됩니다).**

---

</details>
<details>
<summary>paginationPageSize</summary>

---

한 페이지에 표시될 행의 개수를 설정합니다.  
초기값은 20으로, `pagination: true`만 설정됐을 경우 처음 페이지에서 20개 행을 기준으로 자동으로 분할되어 표시됩니다.  

---

</details>
<details>
<summary>paginationPageSizeSelector</summary>

---

페이지 개수를 선택하는 드롭다운 선택기의 옵션을 설정합니다.  

---

</details>

<br>

### Pagination API

| 속성 | 반환 타입 | 설명 |
|:----|:----:|:----|
| paginationIsLastPageFound | `Boolean` | 서버 사이드 페이지네이션일 때 마지막 페이지 정보를 알고 있는지 여부를 반환 |
| paginationGetPageSize | `Number` | 현재 페이지당 행 수를 반환 |
| paginationGetCurrentPage | `Number` | 현재 페이지 인덱스(0부터 시작)를 반환 |
| paginationGetTotalPages | `Number` | 전체 페이지 수를 반환 |
| paginationGoToPage | `void` | 지정한 페이지 인덱스로 이동. 인덱스는 0부터 시작 |
| paginationGoToNextPage | `void` | 다음 페이지로 이동 |
| paginationGoToPreviousPage | `void` | 이전 페이지로 이동 |
| paginationGoToFirstPage | `void` | 첫 페이지로 이동 |
| paginationGoToLastPage | `void` | 마지막 페이지로 이동 |

<details>
<summary>paginationGoToPage</summary>

---

`paginationGoToPage(4)`라고 쓸 경우 페이지가 4페이지로 이동됩니다.

```js
const gridOptions = {
    onFirstDataRendered: (params) => {
        params.api.paginationGoToPage(4); // 처음 렌더링시 4페이지로 시작
    }
}
```

---

</details>

<br>

### Pagination Callbacks

| 속성 | 타입 | 설명 |
|:----|:----:|:----|
| paginationNumberFormatter | `(params: { value: number }) => string` | 페이지 번호를 사용자 지정 포맷으로 표시할 수 있는 함수. 예: value + ' 페이지' |

<details>
<summary>paginationNumberFormatter</summary>

---

```js
const gridOptions = {
    paginationNumberFormatter: (params) => {
        return "[" + params.value.toLocaleString() + "]";
    },
}
```

---

</details>

<br>

### Pagination Events

| 속성 | 타입 | 설명 |
|:----|:----:|:----|
| paginationChanged | `PaginationChangedEvent` | 페이지 상태가 변경될 때마다 발생. 페이지 이동 시 처리할 로직을 연결할 수 있음 |

---

<details>
<summary>paginationChanged</summary>

---

```js
onPaginationChanged = (
    event: PaginationChangedEvent<TData>
) => void;

interface PaginationChangedEvent<TData = any, TContext = any> {
  // True if rows were animated to new position 
  animate?: boolean;
  // True if rows were kept (otherwise complete redraw) 
  keepRenderedRows?: boolean;
  // True if data was new (i.e user set new data) 
  newData?: boolean;
  // True if user went to a new page 
  newPage: boolean;
  // True if user changed the page size 
  newPageSize?: boolean;
  // The grid api. 
  api: GridApi<TData>;
  // Application context as set on `gridOptions.context`. 
  context: TContext;
  // Event identifier 
  type: 'paginationChanged';
}
```

---

</details>


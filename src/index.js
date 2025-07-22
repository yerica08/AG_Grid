// ag grid react : https://front-kuli.tistory.com/257
import { CustomInnerHeader } from './CustomInnerHeader.js';
// https://www.ag-grid.com/javascript-data-grid/localisation/
// https://github.com/ag-grid/ag-grid/blob/latest/community-modules/locale/src/ko-KR.ts

import { AG_GRID_LOCALE_KR } from './AG_GRID_LOCALE_KR..js'; 

let selectedMake;

window.addEventListener('DOMContentLoaded', () => {
   
   // columDefs : 그리드에 표시할 컬럼 정의
   const columnDefs = [
      { 
         field: 'price2',
         type: ['currency', 'shaded'],
         pinned: "left",
         headerComponent: CustomInnerHeader,
         headerComponentParams:{
            icon: "fa-user",
         },
         /*
         enableSorting	gridOptions에 사용됨	전체 그리드에서 정렬 기능을 켤지 말지	전역 설정
         sortable	columnDefs의 각 컬럼에서 사용됨	특정 컬럼의 정렬 허용 여부	컬럼 개별 설정

         둘 다 쓸 수 있음 (하지만 우선순위 있음)
         ✅ 우선순위: enableSorting → sortable
         const gridOptions = {
           enableSorting: false,
           columnDefs: [
             { field: "name", sortable: true }  // ⚠️ 이 설정은 무시됨
           ]
         };
         🤔 그럼 왜 둘 다 존재할까?
         1. 유연성
         enableSorting으로 기본값 지정하고
        
         columnDefs.sortable로 예외만 설정 가능
        
         2. 프로그래밍적 제어
         예: 사용자의 권한에 따라 전체 정렬 막기 (enableSorting: false)
        
         또는 특정 컬럼만 제한하기 (sortable: false)
        
         3. 프레임워크 호환성
         React, Angular에서 gridOptions과 columnDefs를 별도로 관리하는 경우
         전역 설정은 전역, 컬럼 설정은 로컬로 명확히 구분됨

         */
         enableSorting: true, // 여기가 아니라 gridOptions에 설정해야함. sortable : true와 같은 역할. 모든 열에 sortable 추가
         
       },
      { 
        headerName: '제조', // headerName : 제목, 따로 설정하지 않을 시 filed 명으로 자동 세팅 된다.
        field: 'make', // field : 바인딩 될 프로퍼티 명. 컬럼명
        filter: true, // 필터링에 사용될 컨트롤. true로 설정하면 기본적으로 agTextColumnFilter가 설정되며 혹은 직접 특정 컨트롤을 지정할 수도 있다. 사용하기 싫으면 false.
         //lockPosition: 'left'로 지정하면 이전 컬럼을 무시하고 가장 왼쪽으로 이동한다.
         // 근데, 선택박스에 pinned: left를 해놓으면 처음에는 checkbox가 해당 컬럼보다 좌측에 있지만, 다른 컬럼에 움직임이 생기면 해당 컬럼이 체크박스보다 더 왼쪽으로 움직인다.
         // selectionColumnDef에 lockPosition을 걸어도 적용이 안된다.
         // lockPosition이나 suppressMovale: true 둘 다 움직임을 막는다.
        //lockPosition: 'left', // 컬럼을 왼쪽 혹은 오른쪽에 고정시킨다. 컬럼이동 불가. true를 세팅할시 "left"로 치환된다.
        editable: true, // 컬럼값을 수정할 수 있는지 여부. 기본값 false
        suppressMovable: true, // 컬럼 이동 막기.(주위의 컬럼을 이동시켜서 변경되는건 가능) 모든 컬럼을 막고 싶다면 'defaultColDef' 옵션에서 ture 설정.
        pinned: "left", // 필드 선언순서를 무시하고 해당 방향으로 고정
        width: 120, // 넓이 지정,
        cellStyle: { cursor: 'pointer', color: 'pink' },
        cellClass: "currency-cell",
        // hide: true // 컬럼 숨김처리
        /*
            cellClassRules: {
                "text-red" : params => params.value === "ERROR"
            },

            valueFormatter: params => {
                if (params.value == null) return '';
                return this.ntoc(params.value);
            },
        */
          sort: "asc"
    },
      { 
         field: 'model',
         children: [
            {field : 'A', pinned: "left"},
            {field : 'B'}
         ],
         editable: true, // 편집 기능 활성화
         type: 'currency',
       },
      { 
         field: 'price',
         type: ['currency', 'shaded'],
         pinned: "left"
       },
      { 
         field: 'electric',
         flex: 1, // 열이 그리드 너비에 맞춰 유연하게 움직이도록 값을 지정할 수 있음. 1,2,3 ... 으로 각각 다르게 입력하면 비율이 달라짐
         //editable: true // 편집 기능 활성화
       },
   ];

   // rowData : 실제 표시할 데이터(없으면 빈 그리드)
   const rowData = [
      { make: 'Tesla', model: {A: 'Model Y', B: 'model K'}, price: 64950, electric: true },
      { make: 'Tesla', model: {A: 'Model Y', B: 'model K'}, price: 64950, electric: true },
      { make: 'Ford', model: {A: 'F-Series', B: 'B-Series'}, price: 33850, electric: false },
      { make: 'Toyota', model: {A: 'Corolla', B: 'other'}, price: 29600, electric: false },
      { make: 'Mercedes', A: 'EQA', B: 'AAA', price: 48890, electric: true },
      { make: 'Fiat', A: '500', B: '600', price: 15774, electric: false },
      { make: 'Nissan', A: 'Juke', B: 'none', price: 20675, electric: false },
      { make: 'Tesla', A: 'Model Y', B: 'model K', price: 64950, electric: true },
      { make: 'Ford', A: 'F-Series', B: 'B-Series', price: 33850, electric: false },
      { make: 'Toyota', A: 'Corolla', B: 'other', price: 29600, electric: false },
      { make: 'Mercedes', A: 'EQA', B: 'AAA', price: 48890, electric: true },
      { make: 'Fiat', A: '500', B: '600', price: 15774, electric: false },
      { make: 'Nissan', A: 'Juke', B: 'none', price: 20675, electric: false },
      { make: 'Tesla', A: 'Model Y', B: 'model K', price: 64950, electric: true },
      { make: 'Ford', A: 'F-Series', B: 'B-Series', price: 33850, electric: false },
      { make: 'Toyota', A: 'Corolla', B: 'other', price: 29600, electric: false },
      { make: 'Mercedes', A: 'EQA', B: 'AAA', price: 48890, electric: true },
      { make: 'Fiat', A: '500', B: '600', price: 15774, electric: false },
      { make: 'Nissan', A: 'Juke', B: 'none', price: 20675, electric: false },
   ];

   const gridOptions = {
      localeText: AG_GRID_LOCALE_KR,
      // column 세팅
      columnDefs: columnDefs,
      // 기본 컬럼 세팅 (해당 프로퍼티로 개별 세팅된 값이 없을 경우 이 값으로 설정됨)
      defaultColDef: {
         filter: 'agTextColumnFilter', // 필터에 사용될 컨트롤 지정
         floatingFilter: true, // 필터링 컨트롤 표시 여부(input[type="text"] 표시 여부)
         //headerClass: 'text-center', // 헤더에 클레스 부여

         // onCellClicked : 셀을 클릭했을 때 호출되는 함수. 매개변수로 cell 안의 데이터 정보들이 담겨있음.
         onCellClicked: (e) => {
            // rowSelection.checkboxes: true로 생긴 자동 체크박스 컬럼은 사용자가 직접 columnDefs에 정의하지 않으며, 
            // AG Grid가 내부적으로 __selection__ ID를 가진 컬럼을 자동 삽입한 경우에는 onCellClicked 이벤트가 발생하지 않는다.
            // 기본적으로 자동 삽입된 체크박스 컬럼은 selection-only 용도이기 때문에 선택 토글만 작동하고 셀 이벤트는 트리거되지 않도록 설계되어 있다.
            selectedMake = e.data.make;
            console.log(selectedMake)
            // 이게 호출되어야 initGrid의 getRowClass가 다시 호출됨
            // grid.redrawRows();
            grid.redrawRows({ rowNodes: [e.node] }); // 특정 row만 redraw
         },

         resizable: true, // header의 사이즈 조절이 가능하게 됨.
         //sortable: true, // 정렬 기능. 머리글을 클릭하면 오름차순, 내림차순, 기본으로 정렬됨. 

         //suppressStickyLabel: true,
      },
      // 열 속성 집함을 정의할 수 있음. columnDefs에서 type에 속성명을 stirng 혹은 [string] 로 추가하면 열에 적용됨.
      // 열 유형은 열에만 적용되고 열 그룹에는 적용되지 않음.
      columnTypes: {
         currency: { 
            width: 150,
        },
        shaded: {
            cellClass: 'shaded-class'
        }
      },

      // row 세팅
      rowData: rowData,
      rowHeight : 25,

      getRowClass: (params) => {
         // 조건에 만족하는 node에만 클래스명 부여 가능
         return params.data.make === selectedMake ? 'selected-make' : '';
     },

     // getRowNode 메서드를 이용해서 특정 Row를 가져올 때, 식별자로 사용될 값을 지정한다.
      // return타입은 반드시 string이어야 한다.
      getRowId: (params) => params.data.make.toString(),

      // 높이 자동 조절
      domLayout: 'autoHeight',

      // 페이징 사용
       pagination: true,
       paginationPageSize: 8,
       paginationPageSizeSelector: [8, 25, 100],
      

      // 바인딩된 데이터가 없을 경우 loading 오버레이 띄울지 여부
      loading: false,

      // 행 다중 선택 가능(체크박스) : https://www.ag-grid.com/javascript-data-grid/row-selection-multi-row/
      rowSelection: { 
         mode: 'multiRow', // 'multiRow'또는 'singleRow'
        enableSelectionWithoutKeys: true, // ✅Ctrl 없이 다중 선택
        //checkboxes: false, // 각 행을 선택하는 체크박스 안보이게
        //headerCheckbox: false, // 전체 선택 체크박스 안보이게
        // checkboxes와 headerCheckbox 둥 다 false 면 확인란이 비활성화 됨

        // enableClickSelection은 행을 클릭했을 때 행의 선택상자에 영향을 미칠지 여부를 정합니다.
        // 값은 true, false, 'enableDeselection', 'enableSelection' 총 네개가 있습니다.
        // 1. true : 행을 선택하면 체크박스가 선택/해제 됩니다.
        // 2. false : 행을 선택해도 아무일이 발생하지 않습니다.
        // 3. 'enableDeselection' : 선택된 행을 클릭하면 체크박스가 해제됩니다.(재 선택해도 선택 안됨)
        // 4. 'enableSelection' :  행을 선택했을 때 체크박스가 선택됩니다.(재 선택해도 해제 안됨)
        enableClickSelection: false, // 각 행 아무데나 선택하면 선택됨

        // 콜백 함수 를 통해 어떤 행을 선택할 수 있는지 지정할 수 있다
        //   isRowSelectable: (rowNode)=> {
        //    if(rowNode.data.make){
        //       if(rowNode.data.make === "Tesla"){
        //          return true
        //       }else{
        //          return false
        //       }
        //    }
        //   }

        // selectAll 은 header에 있는 전체선택 박스를 선택했을 때 어떤 행들을 선택할지 정하는 속성이다.
        // 만약, filter 기능으로 전체 10개 행중에 2개만 보이는 상황이더라도 기본값인 selectAll : 'all' 인 상태라면 안보이는 행까지 포함한 총 10개의 행이 다 선택된 상태가 된다.
        // selectAll 은 'all', 'filtered', 'currentPage' 총 세 개 중에 한개를 사용한다.
        // 1. 'all' : 기본값으로, 그리드에 뿌려진 모든 행이 선택된다.(다른 페이지 포함)
        // 2. 'filtered' : 안보이는 행을 제외한 현재 그리드에 있는 모든 값이 선택된다.(다른 페이지 포함)
        // 3. 'currentPage' : 현재 페이지(1페이지를 보고 있을 경우 1페이지만)에서 보이는 모든 행을 선택한다.
        // 만약 isRowSelectable로 선택할 수 없는 행이 지정되어 있다면 그 행을 제외한 모든 값을 선택한다. 
        selectAll: 'filtered',
      },
      // rowSelection을 통해 만들어진 행 선택 체크박스 열의 사용자 지정
      selectionColumnDef: {
         sortable: true,
         resizable: true,
         width: 120,
         suppressHeaderMenuButton: false,
         pinned: 'left',
     },

      //suppressMovableColumns: true, // 드래그를 통한 컬럼 이동 금지
      suppressMoveWhenColumnDragging: true, // 컬럼 드래그 중에는 이동하지 않음(드래그 종료 후 컬럼 이동)
      suppressDragLeaveHidesColumns: true, // 컬럼을 드래그 하여 그리드 외부로 이동시 컬럼 자체가 숨김처리 되는데, true로 설정 시 이 현상을 막을 수 있다.

   }
   

   const myGridElement = document.querySelector('#myGrid');

   const grid = agGrid.createGrid(myGridElement, gridOptions);

   // 🔍 Quick Filter
   document.getElementById('quickFilterInput').addEventListener('input', e => {
      grid.setGridOption('quickFilterText',  e.target.value);
   });

   document.getElementById('clearFilterBtn').addEventListener('click', () => {
      document.getElementById('quickFilterInput').value = ''; // 입력창 초기화
      // ✅ Quick Filter 값 비우기
      grid.setGridOption('quickFilterText', '');
      setTimeout(() => {
         grid.setFilterModel(null);
         grid.onFilterChanged();
       }, 50);
   });

   grid.sizeColumnsToFit();
});

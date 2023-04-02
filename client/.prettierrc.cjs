/**
 * Prettier 옵션
 * - https://prettier.io/docs/en/options.html
 */
module.exports = {
  printWidth: 80, // 한 줄 최대 문자 수
  tabWidth: 2, // 들여쓰기 시, 탭 너비
  useTabs: false, // 스페이스 대신 탭 사용
  semi: true, // 문장 끝 세미콜론 사용
  singleQuote: true, // 작은 따옴표 사용
  trailingComma: "all", // 꼬리 콤마 사용
  bracketSpacing: true, // 중괄호 내에 공백 사용
  proseWrap: "never", // 마크다운 포매팅 제외
  endOfLine: "auto", // 개행문자 유지 (혼합일 경우, 첫 줄 개행문자로 통일)
  jsxBracketSameLine: false, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부
  jsxSingleQuote: false, // JSX에 singe 쿼테이션 사용 여부
};

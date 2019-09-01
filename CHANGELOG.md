# Change Log

## [1.8.2] - 2019-09-01
### Changed:
- Merged PR [#25](https://github.com/ipatalas/vscode-postfix-ts/pull/25) - Enable extension in JSX/TSX by default

## [1.8.1] - 2018-10-21
### Fixed:
- Fixed issue [#17](https://github.com/ipatalas/vscode-postfix-ts/issues/17) - suggestions should not be shown inside comments

## [1.8.0] - 2018-07-01
### Added:
- Merged [#16](https://github.com/ipatalas/vscode-postfix-ts/pull/16) - cast templates (thanks @Coffee0127!)

## [1.7.0] - 2018-05-30
### Added:
- Enable usage of multiple '{{here}}' placeholder in a custom template (PR from @AdrieanKhisbe, thanks!)

## [1.6.0] - 2017-06-10
### Added:
- Support for array access expressions so that `expr[i]` will display suggestions as well
- Support for simple custom templates

## [1.5.1] - 2017-05-27
### Added:
- Fixed issue #9 - snippets always on top of suggestions

## [1.5.0] - 2017-05-13
### Added:
- Ability to activate extension in files other than JS/TS

## [1.4.0] - 2017-05-03
### Improved:
- `not` templates now really invert expressions (issue #7)

## [1.3.0] - 2017-04-11
### Added:
- New `foreach` template (issue #6) and general improvements in `for*` templates

## [1.2.0] - 2017-04-09
### Added:
- `not` template can now negate different parts of the expression (selected from Quick Pick)

### Fixed:
- Fixed issue #4 - Console templates are no longer suggested on console expression itself
- Fixed issue #5 - Already negated expressions can now be "un-negated" by using `not` template on them again

## [1.1.1] - 2017-04-05
### Added:
- Support for postfix templates on unary expressions (ie. i++)

### Fixed:
- Some fixes after adding basic tests

## [1.1.0] - 2017-04-03
### Added:
- Console templates (PR from @jrieken, thanks!)

## [1.0.0] - 2017-04-02

- Initial release

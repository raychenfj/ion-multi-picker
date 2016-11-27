# Change Log

## [1.1.0]
### Changed
* To improve the performance of dependent picker, the multi picker will generate picker columns dynamically at run time
### Added
* Expose `columnWidth`, allow to configure column width manually

## [1.0.9]
### Added 
* Allow to customize separator between values from different columns, ref to [issue #17](https://github.com/raychenfj/ion-multi-picker/issues/17)
* Allow to specify the parent column for dependent picker, ref to [pr #19](https://github.com/raychenfj/ion-multi-picker/pull/19)  

## [1.0.8]
### Added
* Migrate to ionic 2.0.0-rc3

## [1.0.7]
### Removed
* remove console info

## [1.0.6] 
### Added
* Migrate to inonic 2.0.0-rc2
* Support binding enum to ngModel, please refer to fruit picker 
### Removed
* Remove city picker. it's a bad use case, column with too many options will cause performance issuses on mobile devices
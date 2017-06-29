# Change Log

## [2.0.4]
### changed
* support ionic lazy loading [issue#49](https://github.com/raychenfj/ion-multi-picker/issues/49) and [issue#57](https://github.com/raychenfj/ion-multi-picker/issues/57)

## [2.0.3]
### changed
* fix critiical issue that can't load html template [issue#56](https://github.com/raychenfj/ion-multi-picker/issues/56)

## [2.0.2]
### changed
* fix bug that can't present the picker correctly when there is large amount of data, ref to [issue#50](https://github.com/raychenfj/ion-multi-picker/issues/50)
### added
* support placeholder

## [2.0.1]
### changed
* fix bug that can't establish correct sequence between columns, ref to [issue#51](https://github.com/raychenfj/ion-multi-picker/issues/51)

## [2.0.0]
### changed
* Update to ionic 3.0.1

## [1.2.0]
### Changed
* Update to ionic 2.2.0
* Update package.json


### [1.1.5]
### Changed
* Update to ionic 2.0.1

## [1.1.4]
### Changed
* Update to ionic 2.0.0-rc5


## [1.1.3]
### Fixed
* Fix label color bug, ref to [issue #34](https://github.com/raychenfj/ion-multi-picker/issues/34)

## [1.1.2]
### Changed
* Migrate to ionic 2.0.0-rc4
* Explicitly export MultiPickerModule, ref to [issue#30](https://github.com/raychenfj/ion-multi-picker/issues/30)

## [1.1.1]
### Changed
* The separator will separate not only the values from each column, but also the texts, ref to [issue #28](https://github.com/raychenfj/ion-multi-picker/issues/28)
* When change the parent column, previously the multi picker will always reset the selcted index of child columns to 0, but now it will keep the selected index. 
If the selected index is less than the length of column options, then it remains; Otherwise, it will be set to length - 1, select the last option. Ref to [issue #27](https://github.com/raychenfj/ion-multi-picker/issues/27)

## [1.1.0]
### Changed
* To improve the performance of dependent picker, the multi picker will generate picker columns dynamically at run time

### Added
* Expose `columnWidth`, allow to configure column width manually

## [1.0.9]
### Added 
* Allow to customize `separator` between values from different columns, ref to [issue #17](https://github.com/raychenfj/ion-multi-picker/issues/17)
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
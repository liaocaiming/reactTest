import { Button, DatePicker, Input, Select } from 'antd';

import * as React from 'react';

import moment from 'moment';

import locale from 'antd/lib/date-picker/locale/zh_CN';

import './index.scss';

import  * as  helpers from '@utils/lib/helpers';

import SessionStorage from '@utils/lib/SessionStorage';

import trim from '@utils/lib/trim';

import Toggle from  '@shared/components/Toggle';

const { Option } = Select;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

const { RangePicker, MonthPicker } = DatePicker;

interface IState {
  selectData: any;
  searchParams: any;
  [random: string]: any;
}

interface IList {
  value: string | number;
  label: string;
}

interface ISelectMap {
  [key: string]: IList[] | object;
}

export interface IRow {
  title?: string;
  dataIndex: string;
  labelWith?: number; // title容器的宽度
  searchDataIndex?: string; // 解决表头字段冲突问题, 冲突时不用再写render了
  InputWidth?: number;
  fieldNames?: { value: string; label: string }; // 下拉数据用做字典转换映射的
  eleAttr?: { [random: string]: any }; // 元素的属性;
  renderSearch?: (item: IRow, state: any, search: (item: IRow) => (e: any) => void) => JSX.Element;
  isShow?: (data: any) => boolean | boolean; // 是否要显示
  isSearch?: boolean; // 是否需要搜索;
  sort?: number; // 排序; 越小排越前面
  [random: string]: any;
}

export interface IProps {
  rowData?: IRow[];
  onValuesChange?: (data: any, changeKey?: string, e?: Event, others?: any) => void; // data 搜索的值, changeKey修改的key;
  dateKeys?: string[]; // 选择时间的字段
  rangePickerKeys?: string[]; // 时间区域的字段
  monthPicker?: string[]; // 月份选择
  defaultValues?: any; // 所有条件的默认值
  size?: string;
  selectKeys?: string[]; // 属于单选下拉框的key,
  mulSelectKeys?: string[]; // 属于单选下拉框的key
  selectMap?: ISelectMap; // 单选下拉数据;
  multipleSelectMap?: ISelectMap; // 多选下拉数据;
  isShowResetBtn?: boolean; // 是否显示重置按钮;
  cascaderKeys?: string[]; // 省市区
  validateSearchParams?: (searchParams: any, isReset?: boolean) => boolean | object; // 校验搜索参数;
  map?: {
    // 做字段转化的
    [key: string]: string; // key是数据字典的字段,  value是转化后的字段;
  };
  getInstance?: (that: any) => void; // 获取组件的实力
  handleSearch?: (params: any, isReset?: boolean) => void | boolean; // 如果需要保存搜索参数请在搜索参数校验通过后返回true;
  actions?: any; // 如果需要保存搜索参数的和获取数据字典必须传入
  isSaveSearchParams?: boolean; // 是否记录搜索的值;
  $$screen?: any; // reducer 数据, 如果需要保存搜索参数的需要传入;
  colSpan?: number; // 按列排版, 一行排几列
  containerMinWidth?: number; // 特殊布局时容器的最小宽度;
  colMargin?: number; // 没列间距;
  btnAfterSearch?: boolean; // 默认false; // true 表示按钮放在搜索条件后面
  [key: string]: any;
}

const widthMap = {
  4: 1400,
  3: 1170,
};

export default class App extends React.Component<IProps, IState> {
  private size: any = 'default';

  // 处理搜索参数, 保存搜索参数;
  private Search = {
    url: window.location.hash.split('#')[1].split('?')[0],
    searchParams: {}, // 保存搜索原数据;
    is: false, // 是否需求保存搜索数据;
    init: (props: IProps) => {
      const { isSaveSearchParams = true, actions, $$screen, defaultValues = {} } = props;
      const href = window.location.href;
      if (isSaveSearchParams && actions && $$screen && href.indexOf('?') < 0) {
        this.Search.is = true;
        this.Search.searchParams = defaultValues;
      }
    },
    save: (props: IProps) => {
      if (!this.Search.is) {
        return;
      }
      const { $$screen } = props;
      const page = ($$screen.getIn(['query']) && $$screen.getIn(['query']).toJS()) || {};
      const actionQuery = ($$screen.getIn(['actionQuery']) && $$screen.getIn(['actionQuery']).toJS()) || {};
      SessionStorage.setItem('groupSearch-params', {
        ...this.Search.get(),
        [this.Search.url]: { searchParams: this.Search.searchParams, actionQuery: actionQuery, page },
      });
    },
    set: (props: IProps) => {
      if (!this.Search.is) {
        return;
      }
      const {
        actions,
        dateKeys = [], // 选择时间的字段
        rangePickerKeys = [], // 时间区域的字段
        monthPicker = [],
        map = {}, // map字段转换;
      } = props;
      const options = this.Search.get()[this.Search.url];
      if (!options) {
        return;
      }

      const { searchParams = {}, actionQuery = {}, page = {} } = options;
      if (Object.keys(actionQuery).length > 0) {
        actions.changeScreenActionQuery(actionQuery);
      }

      if (Object.keys(page).length > 0) {
        actions.changeScreenQuery(page);
      }
      const params = Object.assign({}, searchParams, actionQuery);
      if (Object.keys(params).length > 0) {
        const keys = dateKeys.concat(rangePickerKeys).concat(monthPicker);
        this.Search.searchParams = this.Search.formatData(params, keys, map);
        this.setState({
          searchParams: this.Search.searchParams,
        });
      }
    },

    get: (): object => {
      return SessionStorage.getItem('groupSearch-params') || {};
    },

    formatData: (options: any, keys: string[], map: Object): any => {
      const res: any = Object.create(null);
      // 处理时间日期
      Object.keys(options).forEach((key: string) => {
        const value = options[key];
        if (keys.indexOf(key) !== -1) {
          if (Array.isArray(value)) {
            res[key] = [moment(value[0]), moment(value[1])];
          } else {
            res[key] = moment(value);
          }
        } else {
          res[key] = value;
        }
      });

      // 处理日期时间段
      keys.filter((key: string) => {
        if (key.indexOf('&') !== -1) {
          const [k1, k2] = key.split('&');
          if (options[k1] && options[k2]) {
            Object.assign(res, { [key]: [moment(options[k1]), moment(options[k2])] });
          }
        } else {
          if (options(key)) {
            Object.assign(res, { [key]: moment(options(key)) });
          }
        }
      });

      // 处理map数据
      const mapKeys = Object.keys(map);
      if (mapKeys.length) {
        mapKeys.forEach((key: string) => {
          const k = map[key];
          if (options[k]) {
            Object.assign(options, { [key]: options[k] });
          }
        });
      }

      return { ...options, ...res };
    },
  };

  constructor(props: IProps) {
    super(props);
    const { defaultValues = {} } = props;
    this.state = {
      searchParams: defaultValues,
      selectData: this.initSelectData(props),
    };
    this.Search.init(props);
  }

  public UNSAFE_componentWillMount() {
    this.getSelectData();
    const { getInstance } = this.props;
    getInstance && getInstance(this);
    this.Search.set(this.props);
  }

  public setSearchParams = (options: any, isReplace: boolean = false) => {
    if (isReplace) {
      this.setState({
        searchParams: options,
      });
      return;
    }
    const { searchParams } = this.state;
    this.setState({
      searchParams: { ...searchParams, ...options },
    });
  };

  public UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    const { props } = this;

    if (
      (props !== nextProps && props.selectMap !== nextProps.selectMap) ||
      props.multipleSelectMap !== nextProps.multipleSelectMap
    ) {
      this.setState((preState: IState) => {
        const params = Object.assign({}, preState.selectData, this.initSelectData(nextProps));
        return { selectData: params };
      });
    }

    if (
      props !== nextProps &&
      props.defaultValues !== nextProps.defaultValues &&
      nextProps.defaultValues &&
      JSON.stringify(props.defaultValues) !== JSON.stringify(nextProps.defaultValues)
    ) {
      this.setState({
        searchParams: nextProps.defaultValues,
      });
      this.Search.searchParams = nextProps.defaultValues;
    }

    if (
      props !== nextProps &&
      props.selectKeys !== nextProps.selectKeys &&
      JSON.stringify(props.selectKeys) !== JSON.stringify(nextProps.selectKeys)
    ) {
      // 如果a个组件引用了这个组件，那么a组件被b组件多次引用，从b传到a的数据字典key,就更新一次，这里要监听更新一下。
      this.getSelectData(nextProps);
    }
  }

  public initSelectData = (props: IProps) => {
    const { selectMap, multipleSelectMap } = props;
    const selectData: any = {};
    if (selectMap) {
      Object.keys(selectMap).forEach((key: string) => {
        const values = selectMap[key];
        if (Object.prototype.toString.call(values) === '[object Object]') {
          selectData[key] = this.objToArr(values);
        } else {
          selectData[key] = values;
        }
      });
    }

    if (multipleSelectMap) {
      Object.keys(multipleSelectMap).forEach((key: string) => {
        const values = multipleSelectMap[key];
        if (Object.prototype.toString.call(values) === '[object Object]') {
          selectData[key] = this.objToArr(values);
        } else {
          selectData[key] = values;
        }
      });
    }
    return selectData;
  };

  public objToArr(obj: any) {
    const res: any = [];
    if (!obj) {
      return res;
    }
    Object.keys(obj).forEach((key: string) => {
      res.push({
        value: key,
        label: obj[key],
      });
    });

    return res;
  }

  public deleteHiddenSearchValue = (rowData: IRow[] | undefined, searchParams: any): any => {
    const res: any = Object.assign({}, searchParams);
    if (!Array.isArray(rowData)) {
      return searchParams;
    }

    rowData.forEach((row: IRow) => {
      let isShow: any = row.isShow;
      const dataIndex: string = row.searchDataIndex || row.dataIndex;
      if (isShow && typeof isShow === 'function') {
        isShow = isShow(res);
      }

      if (isShow === false) {
        delete res[dataIndex];
      }
    });
    return res;
  };

  public search: any = (isReset?: boolean) => {
    return () => {
      const { handleSearch, map, validateSearchParams, monthPicker = [], rowData = [] } = this.props;
      const { searchParams: res } = this.state;
      const searchParams = this.deleteHiddenSearchValue(rowData, res);
      let params: any = Object.create(null);

      Object.keys(searchParams).forEach((key: string) => {
        if (key.indexOf('_') !== -1) {
          // 数据字典有冲突时,加前缀, 后面的时用搜索的字段
          const k = key.split('_')[1];
          params[k] = searchParams[key];
        } else if (key.indexOf('&') !== -1) {
          // 处理时间选择区间的问题, 太多地方用了, 不想自定义了, 好烦, dataIndex: startDate&endData, 用&连接
          const keys = key.split('&');
          const values = searchParams[key];
          const item: any = rowData.find((row: IRow) => {
            return row.dataIndex === key || row.searchDataIndex === key;
          });
          const format = (item && item.eleAttr && item.eleAttr.format) || dateFormat;
          if (values && Array.isArray(values) && values.length > 1) {
            params[keys[0]] = values[0].format(format);
            params[keys[1]] = values[1].format(format);
          }
        } else if (monthPicker.indexOf(key) !== -1) {
          Object.assign(params, { [key]: searchParams[key] && searchParams[key].format(monthFormat) });
        } else {
          params[key] = searchParams[key];
        }
      });

      if (map) {
        params = helpers.changeObjKey(params, map);
      }

      if (validateSearchParams && typeof validateSearchParams === 'function') {
        const options = validateSearchParams(params, isReset);
        if (options === false) {
          return;
        }
        if (Object.prototype.toString.call(options) === '[object Object]') {
          params = Object.assign({}, params, options);
        }
      }

      if (handleSearch) {
        const res = trim(helpers.filterEmptyValue(params));
        const isSave = handleSearch(res, isReset);
        if (isSave && this.Search.is) {
          this.Search.searchParams = Object.assign({}, trim(helpers.filterEmptyValue(searchParams)));
        }
      }
    };
  };

  public clearSearch = () => {
    const { defaultValues = {} } = this.props;
    this.setState(
      {
        searchParams: defaultValues,
      },
      this.search(true)
    );
  };

  public changeSearchValue = (item: any) => {
    return (e: any, others?: any) => {
      const { dateKeys = [], onValuesChange } = this.props;
      const dataIndex: string = item.searchDataIndex || item.dataIndex;
      const { selectData } = this.state;
      let value: any;
      if (selectData[dataIndex]) {
        value = e;
      } else if (dateKeys.indexOf(dataIndex) > -1) {
        const format = (item.eleAttr && item.eleAttr.format) || dateFormat;
        value = (e && e.format(format)) || undefined;
        this.setState(
          (preState: IState) => {
            const params = Object.assign({}, preState.searchParams, { [`${dataIndex}_value`]: e });
            return { searchParams: params };
          },
          () => {
            if (onValuesChange && typeof onValuesChange === 'function') {
              const { searchParams } = this.state;
              onValuesChange(searchParams, dataIndex);
            }
          }
        );
      } else if (e && e.target) {
        value = e.target.value;
      } else {
        value = e;
      }
      this.setState(
        (preState: IState, preProp: IProps) => {
          const params = Object.assign({}, preState.searchParams);
          params[dataIndex] = value;
          return { searchParams: params };
        },
        () => {
          if (onValuesChange && typeof onValuesChange === 'function') {
            const { searchParams } = this.state;
            onValuesChange(searchParams, dataIndex);
          }
        }
      );
    };
  };

  public disabledDate = (currentDate: any) => {
    return moment(currentDate) >= moment();
  };

  public getSelectData(nextProps?: IProps) {
    const { actions, selectKeys, mulSelectKeys } = nextProps || this.props;
    if (!actions || (!selectKeys && !mulSelectKeys)) {
      return;
    }
    let array: any = selectKeys;
    if (array && mulSelectKeys) {
      array = array.concat(mulSelectKeys);
    } else if (mulSelectKeys) {
      array = mulSelectKeys;
    }
    actions.get('dict/getDicItemsByCode', { code: array.join(',') }).then((json: any) => {
      if (json.success && json.data) {
        this.setState((preState: IState, preProps) => {
          const params = Object.assign({}, preState.selectData, json.data);
          return { selectData: params };
        });
      }
      return;
    });
  }

  public getPopupContainer = (triggerNode: HTMLElement): HTMLElement => {
    return triggerNode;
  };

  public renderSearchType = (item: IRow) => {
    const {
      dateKeys = [],
      selectKeys = [],
      mulSelectKeys = [],
      selectMap = {},
      multipleSelectMap = {},
      rangePickerKeys = [],
      monthPicker = [],
    } = this.props;

    const dataIndex = item.searchDataIndex || item.dataIndex;
    const longLabel = item.longLabel || false;
    const { eleAttr = {}, fieldNames = {} as any } = item;

    if (item.renderSearch && typeof item.renderSearch === 'function') {
      return item.renderSearch(item, this.state, this.changeSearchValue);
    } else {
      if (selectKeys.indexOf(dataIndex) > -1 || selectMap[dataIndex]) {
        const { selectData = {} } = this.state;
        const selectList = selectData[dataIndex] || [];
        return (
          <Select
            value={this.state.searchParams[dataIndex]}
            style={{ width: '100%' }}
            onChange={this.changeSearchValue(item)}
            placeholder={'请选择内容'}
            size={this.size}
            allowClear
            getPopupContainer={this.getPopupContainer}
            {...eleAttr}
          >
            {selectList &&
              selectList.map((it: any) => {
                const value = it.value || it[fieldNames.value];
                const label = it.label || it[fieldNames.label];
                return (
                  <Option value={value} key={value} title={longLabel ? label : ''}>
                    {label}
                  </Option>
                );
              })}
          </Select>
        );
      } else if (dateKeys.indexOf(dataIndex) > -1) {
        return (
          <DatePicker
            disabledDate={this.disabledDate}
            locale={locale}
            value={this.state.searchParams[`${dataIndex}_value`]}
            onChange={this.changeSearchValue(item)}
            size={this.size}
            style={{ width: '100%' }}
            {...eleAttr}
          />
        );
      } else if (rangePickerKeys.indexOf(dataIndex) > -1) {
        return (
          <RangePicker
            disabledDate={this.disabledDate}
            locale={locale}
            value={this.state.searchParams[`${dataIndex}`]}
            onChange={this.changeSearchValue(item)}
            size={this.size}
            // style={{ width: '100%' }}
            {...eleAttr}
          />
        );
      } else if (monthPicker.indexOf(dataIndex) > -1) {
        return (
          <MonthPicker
            disabledDate={this.disabledDate}
            locale={locale}
            value={this.state.searchParams[`${dataIndex}`]}
            onChange={this.changeSearchValue(item)}
            size={this.size}
            // style={{ width: '100%' }}
            {...eleAttr}
          />
        );
      } else if (mulSelectKeys.indexOf(dataIndex) > -1 || multipleSelectMap[dataIndex]) {
        const { selectData } = this.state;
        const selectList = selectData[dataIndex] || [];
        return (
          <Select
            value={this.state.searchParams[dataIndex]}
            style={{ width: '100%' }}
            onChange={this.changeSearchValue(item)}
            placeholder={'请选择内容'}
            mode="multiple"
            size={this.size}
            allowClear
            showArrow
            getPopupContainer={this.getPopupContainer}
            {...eleAttr}
          >
            {selectList &&
              selectList.map((it: any) => {
                const value = it.value || it[fieldNames.value];
                const label = it.label || it[fieldNames.label];
                return (
                  <Option value={value} key={value} title={longLabel ? label : ''}>
                    {label}
                  </Option>
                );
              })}
          </Select>
        );
      }  else {
        return (
          <Input
            placeholder="请输入搜索内容"
            style={{ width: '100%' }}
            value={this.state.searchParams[dataIndex]}
            onChange={this.changeSearchValue(item)}
            size={this.size}
            {...eleAttr}
          />
        );
      }
    }
  };

  public renderResetBnt = () => {
    const { isShowResetBtn } = this.props;
    if (isShowResetBtn) {
      return (
        <Button onClick={this.clearSearch} size={this.size} className={'fl margin_left_20'}>
          重置
        </Button>
      );
    }
    return null;
  };

  public filterRowData = (rowData: IRow[] | undefined, searchParams: any): IRow[] => {
    if (!Array.isArray(rowData)) {
      return [];
    }
    let data = rowData.filter((row: IRow) => {
      let isShow: any = row.isShow;
      if (typeof isShow === 'function') {
        isShow = isShow(searchParams);
      }
      return isShow !== false;
    });

    let arr = data.filter((row: IRow) => {
      return row.isSearch;
    });

    let rows = arr.length ? arr : data;

    return rows
      .map((row: IRow, index: number) => {
        return { ...row, sort: row.sort || index };
      })
      .sort((a: any, b: any) => {
        return a.sort - b.sort;
      });
  };

  public renderSearchContent() {
    const { rowData, btnAfterSearch } = this.props;
    const { searchParams } = this.state;

    const rowArr = this.filterRowData(rowData, searchParams);

    if (btnAfterSearch) {
      rowArr.push({
        dataIndex: 'btn',
        renderSearch: () => {
          return this.renderBtn();
        },
      });
    }

    return (
      <div className={helpers.reactClassNameJoin(['group-search-container', 'clearfix'])}>
        {rowArr &&
          rowArr.map((item: IRow) => {
            const dataIndex = item.searchDataIndex || item.dataIndex;
            return (
              <div key={dataIndex} className={helpers.reactClassNameJoin([`row-item-${dataIndex}`, 'row-item', 'fl'])}>
                <Toggle isShow={!!item.title}>
                  <div className="row-item-label fl">{item.title}:</div>
                </Toggle>
                <div
                  className={helpers.reactClassNameJoin(['fl', 'input'])}
                  style={{ minWidth: item.InputWidth || 180 }}
                >
                  {this.renderSearchType(item)}
                </div>
              </div>
            );
          })}

        {!btnAfterSearch ? this.renderBtn() : null}
      </div>
    );
  }

  public renderFlexSearchContent() {
    const { rowData, colSpan = 1, colMargin, containerMinWidth, btnAfterSearch } = this.props;
    const { searchParams } = this.state;

    const rowArr = this.filterRowData(rowData, searchParams);

    if (btnAfterSearch) {
      rowArr.push({
        dataIndex: 'btn',
        renderSearch: () => {
          return this.renderBtn();
        },
      });
    }

    const rows = helpers.dyadicArray(rowArr, colSpan);

    return (
      <div
        style={{ minWidth: containerMinWidth || widthMap[colSpan] }}
        className={helpers.reactClassNameJoin(['group-search-container'])}
      >
        {rows &&
          rows.map((arr: any, index: number) => {
            return (
              <div key={index} className="group-search-row group-search-row-flex clearfix">
                {arr.map((item: IRow) => {
                  const dataIndex = item.searchDataIndex || item.dataIndex;
                  const { labelWith = 80 } = item;
                  return (
                    <div
                      key={dataIndex}
                      className={helpers.reactClassNameJoin([`row-item-${dataIndex}`, 'row-item', 'fl'])}
                      style={{
                        width: colMargin,
                      }}
                    >
                      <Toggle isShow={!!item.title}>
                        <div className="row-item-label fl" style={{ minWidth: labelWith }}>
                          {item.title}:
                        </div>
                      </Toggle>
                      <div
                        className={helpers.reactClassNameJoin(['fl', 'row-item-input'])}
                        style={{ minWidth: item.InputWidth || 180 }}
                      >
                        {this.renderSearchType(item)}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

        {!btnAfterSearch ? this.renderBtn() : null}
      </div>
    );
  }

  public renderBtn = () => {
    return (
      <div className="fl">
        <Button type="primary" onClick={this.search()} size={this.size} className="groupSearch-btn">
          查询
        </Button>
        {this.renderResetBnt()}
        {this.props.children}
      </div>
    );
  };

  public renderContent() {
    const { colSpan } = this.props;
    if (colSpan) {
      return this.renderFlexSearchContent();
    }
    return this.renderSearchContent();
  }

  public render() {
    return <div className="fezs-group-search-new-container">{this.renderContent()}</div>;
  }

  public componentWillUnmount() {
    this.Search.save(this.props);
  }
}

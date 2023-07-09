/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  // 自动模拟测试中导入的所有模块
  // automock: false,

  // 在`n`个失败后停止运行测试
  // bail: 0,

  // Jest应存储其缓存依赖信息的目录
  // cacheDirectory: "",

  // 在每个测试之前自动清除模拟调用、实例、上下文和结果
  clearMocks: true,

  // 指示是否应在执行测试时收集覆盖信息
  collectCoverage: true,

  // 一个glob模式数组，指示应收集哪些文件的覆盖信息
  // collectCoverageFrom: undefined,

  // Jest应输出其覆盖文件的目录
  coverageDirectory: 'coverage',

  // 用于跳过覆盖收集的正则表达式模式字符串数组
  // coveragePathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // 指示应使用哪个提供者来为覆盖进行代码插桩
  // coverageProvider: "babel",

  // Jest在编写覆盖报告时使用的报告器名称列表
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // 一个配置覆盖结果最小阈值执行的对象
  // coverageThreshold: {
  // 	"global": {
  //     "branches": 50,
  //     "functions": 50,
  //     "lines": 50,
  //     "statements": 50
  //   },
  //   "./src/components/": {
  //     "branches": 40,
  //     "statements": 40
  //   },
  //   "./src/utils": {
  //     "statements": 90
  //   },
  //   "./src/directive": {
  //     "statements": 90
  //   },
  //   "./src/utils/is.ts": {
  //     "branches": 100,
  //     "functions": 100,
  //     "lines": 100,
  //     "statements": 100
  //   }
  // },

  // 自定义依赖项提取器的路径
  // dependencyExtractor: undefined,

  // 使调用已弃用的API抛出有用的错误消息
  // errorOnDeprecated: false,

  // 伪造计时器的默认配置
  // fakeTimers: {
  //   "enableGlobally": false
  // },

  // 使用glob模式数组从忽略的文件中强制收集覆盖
  // forceCoverageMatch: [],

  // 一个模块的路径，该模块导出一个在所有测试套件之前触发一次的异步函数
  // globalSetup: undefined,

  // 一个模块的路径，该模块导出一个在所有测试套件之后触发一次的异步函数
  // globalTeardown: undefined,

  // 需要在所有测试环境中可用的全局变量集
  // globals: {
  //   '@vue/vue3-jest': {
  //     compilerOptions: {
  //       propsDestructureTransform: true
  //     }
  //   }
  // },

  // 用于运行测试的最大工作量。可以指定为%或数字。例如，maxWorkers: 10%将使用您的CPU数量的10%+1作为最大工作量。maxWorkers: 2将使用最多2个工作量。
  // maxWorkers: "50%",

  // 一个目录名数组，从需要的模块位置递归向上搜索
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // 模块使用的文件扩展名数组
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],

  // 从正则表达式到模块名的映射，或者到允许使用单个模块来存根资源的模块名数组的映射
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^_/(.*)$': '<rootDir>/__mocks__/$1',
    'ant-design-vue/es/locale/(.*)': '<rootDir>/node_modules/ant-design-vue/lib/locale/$1'
  },

  // 一个正则表达式模式字符串数组，与所有模块路径匹配，匹配的模块在被模块加载器视为'可见'之前
  // modulePathIgnorePatterns: [],

  // 激活测试结果的通知
  // notify: false,

  // 指定通知模式的枚举。需要{ notify: true }
  // notifyMode: "failure-change",

  // 用作Jest配置基础的预设
  // preset: undefined,

  // 从一个或多个项目运行测试
  // projects: undefined,

  // 使用此配置选项向Jest添加自定义报告器
  // reporters: undefined,

  // 在每个测试之前自动重置模拟状态
  // resetMocks: false,

  // 在运行每个单独的测试之前重置模块注册表
  // resetModules: false,

  // 自定义解析器的路径
  // resolver: undefined,

  // 在每个测试之前自动恢复模拟状态和实现
  // restoreMocks: false,

  // Jest应扫描测试和模块的根目录
  // rootDir: undefined,

  // Jest应用于搜索文件的目录路径列表
  // roots: [
  //   "<rootDir>"
  // ],

  // 允许您使用自定义运行器而不是Jest的默认测试运行器
  // runner: "jest-runner",

  // 运行一些代码以配置或设置测试环境的模块路径
  setupFiles: ['<rootDir>/__mocks__/setupFiles.js'],

  // 运行一些代码以配置或设置测试框架的模块路径列表
  // setupFilesAfterEnv: [],

  // 考虑为慢速的测试，并在结果中报告为此的秒数。
  // slowTestThreshold: 5,

  // Jest应用于快照测试的快照序列化模块路径列表
  // snapshotSerializers: [],

  // 将用于测试的测试环境
  testEnvironment: 'jsdom',

  // 将传递给测试环境的选项
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },

  // 在测试结果中添加位置字段
  // testLocationInResults: false,

  // Jest用于检测测试文件的glob模式
  testMatch: ['**/__tests__/?(*.)+(spec|test).[tj]s?(x)'],

  // 一个与所有测试路径匹配的正则表达式模式字符串数组，匹配的测试将被跳过
  // testPathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // Jest用于检测测试文件的正则表达式模式或模式数组
  // testRegex: [],

  // 此选项允许使用自定义结果处理器
  // testResultsProcessor: undefined,

  // 此选项允许使用自定义测试运行器
  // testRunner: "jest-circus/runner",

  // 从正则表达式到转换器路径的映射
  transform: {
    '^.+\\.jsx?$': 'babel-jest', //这个是jest的默认配置
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta', // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: { metaObjectReplacement: { env: { NODE: '' } } }
            }
          ]
        }
      }
    ],
    '^.+\\.vue?$': '@vue/vue3-jest', //vue转换
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileTransformer.js'
  }

  // 一个与所有源文件路径匹配的正则表达式模式字符串数组，匹配的文件将跳过转换
  // transformIgnorePatterns: ['node_modules']

  // 一个与所有模块匹配的正则表达式模式字符串数组，模块加载器在自动为它们返回模拟之前，匹配的模块
  // unmockedModulePathPatterns: undefined,

  // 指示是否应在运行期间报告每个单独的测试
  // verbose: undefined,

  // 一个与所有源文件路径匹配的正则表达式模式数组，在观察模式下重新运行测试之前
  // watchPathIgnorePatterns: [],

  // 是否使用watchman进行文件爬取
  // watchman: true,
}

export default config

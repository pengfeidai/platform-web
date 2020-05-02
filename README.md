# Platform Web

Go-Micro微服务治理、监控平台

## 运行（开发阶段）

1. 运行后台

切到[backend](./backend)目录

Mac/Linux

```bash
# 打开gomod
go env -w GO111MODULE=on
# 设置代理源
go env -w GOPROXY=https://goproxy.cn,direct
# 运行
go run main.go plugins.go
```

Windows

```bash
$env:GO111MODULE = "on"
$env:GOPROXY = "https://goproxy.cn"

go run main.go plugins.go
```

2. 运行前端

1. 运行后台

切到[frontend](./frontend)目录

```bash
# 第一次需执行安装
npm install
# 运行
npm start
```

## 特性

进行中：服务列表

- [x] 控制台框架
  - [x] Antd, Typescript
  - [x] Go-Micro
- [ ] 服务
  - [x] 列表
    - [x] 后台
    - [x] 前端
  - [ ] 详情
    - [ ] 指标
      - [ ] 接口调用
      - [ ] 内存占用
      - [ ] 线程数
      - [ ] 协程数
      - [ ] 慢接口
  - [ ] 调用
    - [x] 后台
    - [ ] 前端
  - [ ] 分组
    - [ ] 后台
    - [ ] 前端
  - [ ] 路由
  - [ ] 生命周期
  - [ ] 下线 
  - [ ] 上线
- [] 系统
  - [] 内存
- [ ] 负载均衡
  - [ ] 插件  
  - [ ] web 
- [ ] 统一配置
- [ ] 流量分发
  - [ ] 灰度
  - [ ] 动态流量调度
- [ ] 容错
  - [ ] 熔断
  - [ ] 降级
  - [ ] 过载
- [ ] 服务监控
  - [ ] 指标
  - [ ] 报警

## 中间件

- [ ] Redis
- [ ] MySQL
- [ ] PostgreSQL
- [ ] MQ
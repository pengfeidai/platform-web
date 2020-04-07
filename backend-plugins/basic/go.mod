module github.com/micro-in-cn/platform-web/backend-plugins/basic/v1

go 1.14

replace (
  github.com/micro-in-cn/platform-web/backend v1.3.0 => /home/sx/Project/go/micro-in-cn/platform-web/backend
)

require (
       github.com/micro/go-micro/v2 v2.4.0
       github.com/micro-in-cn/platform-web/backend v1.3.0
)

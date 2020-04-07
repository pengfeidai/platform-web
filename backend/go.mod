module github.com/micro-in-cn/platform-web/backend

go 1.14

replace (
  github.com/micro-in-cn/platform-web/backend-plugins v1.3.0 => /home/sx/Project/go/micro-in-cn/platform-web/backend-plugins
)

require (
   github.com/micro-in-cn/platform-web/backend-plugins v1.3.0
   github.com/micro/go-micro/v2 v2.4.0
)
package basic

import (
	"sync"

	"github.com/micro-in-cn/platform-web/backend/plugins"
	"github.com/micro/cli/v2"
)

func init() {
	m = &basicModule{
		name: "basic",
		path: "/b",
	}

	plugins.Register(m)
}

var (
	m *basicModule

	// Default address to bind to
	GatewayNamespaces  = []string{"go.micro.api"}
	WebNamespacePrefix = []string{"go.micro.web"}
)

// basicModule includes web, registry, CLI, Stats submodules.
type basicModule struct {
	name string
	path string
	sync.RWMutex
	api *api
}

func (m *basicModule) Name() string {
	return m.name
}

func (m *basicModule) Path() string {
	return m.path
}

func (m *basicModule) Init(*cli.Context) error {
	return nil
}

func (m *basicModule) Flags() []cli.Flag {
	return nil
}

func (m *basicModule) Handlers() (mp map[string]*plugins.Handler) {
	m.Lock()
	defer m.Unlock()

	mp = make(map[string]*plugins.Handler)
	mp["/services"] = &plugins.Handler{
		Func:   m.api.services,
		Method: []string{"GET"},
	}

	mp["/micro-services"] = &plugins.Handler{
		Func:   m.api.microServices,
		Method: []string{"GET"},
	}

	mp["/service"] = &plugins.Handler{
		Func:   m.api.service,
		Method: []string{"GET"},
	}

	mp["/api-gateway-services"] = &plugins.Handler{
		Func:   m.api.apiGatewayServices,
		Method: []string{"GET"},
	}

	mp["/service-details"] = &plugins.Handler{
		Func:   m.api.serviceDetails,
		Method: []string{"GET"},
	}

	mp["/stats"] = &plugins.Handler{
		Func:   m.api.stats,
		Method: []string{"GET"},
	}

	mp["/web-services"] = &plugins.Handler{
		Func:   m.api.webServices,
		Method: []string{"GET"},
	}

	mp["/rpc"] = &plugins.Handler{
		Func:   m.api.rpc,
		Method: []string{"POST"},
	}

	mp["/health"] = &plugins.Handler{
		Func:   m.api.health,
		Method: []string{"GET"},
	}

	return
}

func (m *basicModule) Commands(options ...plugins.Option) []cli.Command {
	command := cli.Command{
		Name:  "web",
		Usage: "Run the web dashboard",
		Action: func(c *cli.Context) error {
			// run(c, options...)
			return nil
		},
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "address",
				Usage:   "Set the web UI address e.g 0.0.0.0:8082",
				EnvVars: []string{"MICRO_WEB_ADDRESS"},
			},
			&cli.StringFlag{
				Name:    "namespace",
				Usage:   "Set the namespace used by the Web proxy e.g. com.example.web",
				EnvVars: []string{"MICRO_WEB_NAMESPACE"},
			},
			&cli.StringFlag{
				Name:    "static_dir",
				Usage:   "Set the static dir of micro web",
				EnvVars: []string{"MICRO_WEB_STATIC_DIR"},
			},
		},
	}

	return []cli.Command{command}
}

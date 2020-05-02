package metadata

// ServiceGroup set the group name for the service as value of metadata
// we use this name for groupby services
func ServiceGroup(groupName string, md map[string]string) (ret map[string]string) {
	if md == nil {
		md = map[string]string{}
	}

	// hard coding first
	md["x-service-group"] = groupName

	return md
}

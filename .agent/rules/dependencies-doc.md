---
trigger: always_on
---

Always use context7 mcp server tools to resolve id of the dependency (use the name of the library in package.json as the id), then use the get library doc tool to fetch it.

It will allow you to have the documentation of the latest version of the library in your context, even if you don't have data on this version, and it will improve a lot your debugging capacities.

Use Bun as the project package manager. Powershell is the shell used to run all commands.

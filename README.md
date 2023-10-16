# roku-dev

Roku developer helper tools.

Based mostly on https://developer.roku.com/en-gb/docs/developer-program/dev-tools/external-control-api.md
but also using the functionality of the local Roku app (`http://<Roku_IP>`) associated with the device.

Could be used as a command line or programmatically.

Includes Common JavaScript, ECMAScript, and Typescript sources.

## Installation

### Project Scope

```bash
npm install --save-dev roku-dev
```

### Global Scope

```bash
npm install -g roku-dev
```

## Command Line

Environment variables (including .env file) could be used instead of arguments or options.

This is using [ECP](https://developer.roku.com/en-gb/docs/developer-program/dev-tools/external-control-api.md#external-control-service-commands)
and the local Roku device app.

### app

Returns data of the currently running application.

```bash
roku app [--ip <Roku device IP>]
```

* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **ROKU_IP** (ip)

### apps

Returns data of all installed applications.

```bash
roku apps [--ip <Roku device IP>]
```

* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **ROKU_IP** (ip)

### assets

Roku ECP - `query/r2d2-bitmaps`

Returns a list of the assets that have been loaded into texture memory
and the amount of used, available, and maximum memory on your device (in bytes).

As of Roku OS 11.5, this query returns all bitmaps in texture memory
including those that cannot be directly attributed to a channel.

```bash
roku assets [--ip <Roku device IP>]
```

* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **ROKU_IP** (ip)

### beacons

Roku ECP:

* `query/fwbeacons`
* `query/fwbeacons/track`
* `query/fwbeacons/track/<channelId>`
* `query/fwbeacons/untrack`

Tracks channel and media lifecycle events for a specific channel.
To use these commands, the device must have developer mode enabled.

**command** values:

* **log** (default) - Retrieves the channel and media lifecycle events that have occurred since the previous query,
or since tracking was enabled if no query has been done.
* **track** - Enables tracking of channel and media lifecycle events for a specific channel.
When tracking is enabled, a maximum of 1,000 events may be queued for retrieval with the query/fwbeacons command;
events may be lost if not queried. If tracking is enabled with a different channel ID,
all queued events on the previous channel are discarded.
If the channelId path parameter is not specified, the query is run on the foreground UI channel.
All devices may monitor a sideloaded channel.
Devices that are keyed may monitor channels from the Roku Channel Store that are signed with the same developer key.
* **untrack** - Disables tracking of channel and media lifecycle events (if enabled) and discards all queued events.

```bash
roku beacons [channelId] [command = 'log'] [--ip <Roku device IP>]
```

* **channelId** - channel id for a sideloaded channel or production/beta channel linked to the Roku developer's account
* **command** - log (default), track, untrack
* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **CHANNEL_ID** (channelId)
* **ROKU_IP** (ip)

### device

Roku ECP - `query/device-info`

Retrieves device information similar to that returned by roDeviceInfo.

```bash
roku device [--ip <Roku device IP>]
```

* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **ROKU_IP** (ip)

### fps

Roku ECP - `query/graphics-frame-rate`

Returns the recent number of rendered graphics frames per seconds (this value is separate from the video frame rate).
Developer mode must be enabled to use this command.

```bash
roku fps [--ip <Roku device IP>]
```

* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **ROKU_IP** (ip)

### icon

Roku ECP - `query/icon/<CHANNEL_ID>`

Downloads under iconPath an icon file corresponding to the application identified by channelId.
The binary data with an identifying MIME-type header is returned.

```bash
roku icon [channelId] [iconPath] [--ip <Roku device IP>]
```

* **channelId** - channel id of the app for which icon should be downloaded
* **iconPath** - path where icon file should be downloaded
* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **CHANNEL_ID** (channelId)
* **ICON_PATH** (iconPath)
* **ROKU_IP** (ip)

### key

Roku ECP:

* `keydown/<KEY>`
* `keyup/<KEY>`
* `keypress/<KEY>`

Sends key press/down/up

**type** values:

* press (default) - Equivalent to pressing down and releasing the remote control key identified after the slash.
You can also use this command, and the keydown and keyup commands,
to send keyboard alphanumeric characters when a keyboard screen is active, as described in Keypress Key Values.
* down - Equivalent to pressing the remote control key identified after the slash.
* up - Equivalent to releasing the remote control key identified after the slash.

```bash
roku key [keyString] [type = 'press'] [--ip <Roku device IP>] [-u --escaped]
```

* **keyString** - key string which should be sent
* **type** - press (default), down, up
* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **ROKU_IP** (ip)

### launch

Roku ECP - `launch/[channelId]?contentId=<contentId>&MediaType=<mediaType>`

Launches channel of given channel id with given content id and media type.

```bash
roku launch [channelId] [--ip <Roku device IP>] [--mediaType <mediaType>] [--contentId <contentId>]
```

* **channelId** - channel id for a channel that should be launched
* **ip** - IP of the Roku device
* **mediaType** - optional media type for content of launched app
* **contentId** - optional content id for launched app

Environment variables (command argument/option):

* **CHANNEL_ID** (channelId)
* **ROKU_IP** (ip)

### nodes

Roku ECP:

* `query/sgnodes/all`
* `query/sgnodes/roots`
* `query/sgnodes/nodes?node-id=nodeId`

Returns all/root or finds some rendered nodes.

**type** values:

* **all** (default) - Returns all the nodes created by the currently running channel.
This includes the number of osref references to the node (held in the Roku platform)
and bscref references (held in the channel application).
* **roots** - Prints every existing node without a parent that has been created by the currently running channel.
The existence of these un-parented nodes means they are being kept alive by direct BrightScript references.
These could be in variables local to a function, arrays, or associative arrays,
including a component global m or an associative array field of a node.
* **find** - Prints nodes with an id field set to node_ID, except it,
bypasses all the hierarchy and rules and just runs straight down the whole list in the order of node creation.
It will list multiple nodes if there are several that match.

```bash
roku nodes [type = 'all'] [nodeId] [--ip <Roku device IP>]
```

* **type** - all (default), roots, find
* **nodeId** - node id used with type = 'find'
* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **ROKU_IP** (ip)

### package

Roku GUI (device's local app) - Packager

Creates and downloads packaged application.

To use this command, the device must be keyed with the same developer ID/key that was used to generate the channel package.

```bash
roku package [appName] [path] [password] [--ip <Roku device IP>] [-p --password <password>]
```

* **appName** - name for the packaged app
* **path** - Path of the app archive file that should be packed
* **password** (argument) - password used for signing the package or rekey the device
* **ip** - IP of the Roku device
* **password** (option) - developer's password of Roku device

Environment variables (command argument/option):

* **APP_NAME** (appName)
* **GENERATED_SIGNED_PACKAGE_PATH** OR **SIGNED_PACKAGE_PATH** (path)
* **ROKU_DEV_SIGNING_PASSWORD** (password - argument)
* **ROKU_IP** (ip)
* **ROKU_DEV_PASSWORD** (password - option)

### performance

Roku ECP:

* `query/chanperf`
* `query/chanperf/<channelld>?duration-seconds=<seconds>`

Returns the current memory and CPU utilization of the channel running in the foreground (RAM usage is reported bytes).
The foreground channel may either be a sideloaded channel or a channel from the Roku Channel Store.
To output the results for a channel in the channel store,
the device must be keyed with the same developer ID/key that was used to generate the channel package.

Including the channelId option in the path outputs statistics for a specific channel from the Roku Channel Store.

To use this command, the device must be keyed with the same developer ID/key that was used to generate the channel package.

The channel's process ID (pid) is added to the output of this command.

```bash
roku performance [channelId] [--ip <Roku device IP>]
```

* **channelId** - channel id for a sideloaded channel or production/beta channel linked to the Roku developer's account
* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **CHANNEL_ID** (channelId)
* **ROKU_IP** (ip)

### player

Roku ECP - `query/media-player`

Returns a child element named 'player' that identifies the media player state.
The information returned includes the current stream segment and position of the content being played,
the running time of the content, audio format, and buffering.

```bash
roku player [--ip <Roku device IP>]
```

* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **ROKU_IP** (ip)

### registry

Roku ECP - `query/registry/<CHANNEL_ID>`

Lists the entries in the device registry for a sideloaded channel or production/beta channel linked to the Roku developer's account.
The channel ID must be provided; for sideloaded channels, use "dev" as the channelId.

Options:

* **escaped** - Specify whether special characters are escaped not (not escaped by default).
* **keys** - Provide the name of one or more specific registry key values to be returned.
  To return multiple registry key values, OR the names together (for example, nextPaymentDate|lastPaymentDate).
* **sections** - Provide the name of one or more specific registry sections to be returned.
  To return multiple registry sections, OR the names together (for example, paymentInfo|token).

```bash
roku registry [channelId] [--ip <Roku device IP>] [-u, --escaped] [-k, --keys <keys>] [-s, --sections <sections>]
```

* **channelId** - channel id for a sideloaded channel or production/beta channel linked to the Roku developer's account
* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **CHANNEL_ID** (channelId)
* **ROKU_IP** (ip)

### rekey

Roku GUI (device's local app) - Utilities - Rekey

Rekey the Roku device with the given signed package and signing password.

```bash
roku rekey [password] [path] [--ip <Roku device IP>] [-p --password <password>]
```

* **password** (argument) - password used for signing the package or rekey the device
* **path** - Path to the already signed package that should be used for rekey
* **ip** - IP of the Roku device
* **password** (option) - developer's password of Roku device

Environment variables (command argument/option):

* **ROKU_DEV_SIGNING_PASSWORD** (password - argument)
* **ALREADY_SIGNED_PACKAGE_PATH** OR **SIGNED_PACKAGE_PATH** (path)
* **ROKU_IP** (ip)
* **ROKU_DEV_PASSWORD** (password - option)

### rendezvous

Roku ECP:

* `query/sgrendezvous`
* `query/sgrendezvous/track`
* `query/sgrendezvous/untrack`

Lists the node rendezvous events for a sideloaded channel or production/beta channel linked to the Roku developer's account.

**command** values:

* **log** (default) - Returns the rendezvous events that have occurred since tracking was enabled,
or since the previous call to query/sgrendezvous.
A maximum of 1,000 events are queued between calls; events beyond this limit are not logged.
If events are dropped, the response includes the total count of those dropped events.
* **track** - Starts the logging of node rendezvous events node between threads.
Only one channel can be tracked at a time.
Tracking a different channel clears any queued rendezvous events.
* **untrack** - Stops the tracking of rendezvous events.

```bash
roku rendezvous [channelId] [command = 'log'] [--ip <Roku device IP>]
```

* **channelId** - channel id for a sideloaded channel or production/beta channel linked to the Roku developer's account
* **command** - log (default), track, untrack
* **ip** - IP of the Roku device

Environment variables (command argument/option):

* **CHANNEL_ID** (channelId)
* **ROKU_IP** (ip)

### screenshot

Roku GUI (device's local app) - Utilities - Screenshot

Takes a screenshot of the dev app and download it to the JPG file.

```bash
roku screenshot [path] [--ip <Roku device IP>] [-p, --password <password>]
```

* **path** - Path where screenshot should be saved
* **ip** - IP of the Roku device
* **password** - developer's password of Roku device

Environment variables (command argument/option):

* **SCREENSHOT_PATH** (path)
* **ROKU_IP** (ip)
* **ROKU_DEV_PASSWORD** (password)

### upload

Roku GUI (device's local app) - Installer

Uploads archived (.zip) app to the Roku device.

```bash
roku upload [path] [--ip <Roku device IP>] [-p, --password <password>]
```

* **path** - Path of the app archive file
* **ip** - IP of the Roku device
* **password** - developer's password of Roku device

Environment variables (command argument/option):

* **APP_ARCHIVE_PATH** (path)
* **ROKU_IP** (ip)
* **ROKU_DEV_PASSWORD** (password)

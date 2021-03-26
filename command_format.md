# Hi, heres some instructions on command format!

1. Import what you need at the top, usually from collections.
2. Export an object using module.exports.

Follow the format of this object!
Leave any blank if not relevant!

```
{
  name: 'insert name of command here',
  description: 'provide a helpful descriptoin of commands here',
  args: bool --> require args
  aliases: ['provide', 'several', 'aliases'];
  usage: '[provide guiders on how to use the command]',
  roles: ['role','names'],
  channels: ['channel','names'],
  category: ['category', 'names'],
  cooldown: 0 provide a cooldown,
  guildOnly: bool --> server only
  (async) execute(parameters) {
    command function goes here
  },
};
```
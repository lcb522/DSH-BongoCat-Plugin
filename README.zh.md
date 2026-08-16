# @deepseek-ai/dsh-client-ui-bongocat

[English](README.md) | 中文

**猫爪桌宠**：DeepSeek Harness 网页端的打字陪伴桌宠。在界面角落放一只猫爪，你打字时它跟着拍击，气泡显示按下的键——灵感来自 [BongoCat](https://github.com/ayangweb/BongoCat)（MIT），为浏览器环境从零重写。

## 特性

- **完整小猫场景**：闭眼笑小白猫（耳朵/腮红/胡须）趴在键盘上，左右双爪独立拍击、头部联动轻点
- **左右爪分区**：按左手区的键（QWERT/ASDFG/ZXCVB/1-5）左爪拍，右手区的键右爪拍，**空格和鼠标左键双爪齐拍**
- **按键气泡**：按下的键以键帽气泡形式弹出并渐隐，最多同时 7 个；`prefers-reduced-motion` 用户自动停用呼吸动画
- **隐私优先**：密码框、token/密钥类输入框**始终显示 •••**，不显示真实键名；也可完全关闭气泡只留动画
- **自由摆放**：左下/右下角切换，50%–180% 缩放
- **零打扰**：`pointer-events: none`——猫爪完全不可点击、不挡任何操作
- 一键开关：关闭即完全移除，不残留任何 DOM 与监听器

## 安装（Windows）

```powershell
# 插件目录已就位时，只需链接 + 注册（幂等）：
$DshHome = "$env:USERPROFILE\.dsh"
$src = "<本仓库路径>"
$dest = "$DshHome\plugins\@deepseek-ai\dsh-client-ui-bongocat"
New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
Copy-Item "$src\*" $dest -Recurse -Force
$link = "$DshHome\profiles\node_modules\@deepseek-ai\dsh-client-ui-bongocat"
New-Item -ItemType Directory -Force -Path (Split-Path $link) | Out-Null
New-Item -ItemType Junction -Path $link -Target $dest | Out-Null
```

然后往 `$DshHome\profiles\web\cordis.patch.yml` 追加：

```yaml
- insert:
    - id: ui-bongocat
      name: '@deepseek-ai/dsh-client-ui-bongocat'
```

刷新 Web 界面即可。

## 使用

刷新后默认开启。总开关在 **设置 → 插件 → 猫爪桌宠**；位置/大小/按键气泡在 **设置 → 通用设置 → 外观** 下方（玻璃主题调节行下面）。

## 与桌面版 BongoCat 的差别

浏览器插件无法监听系统全局键鼠（只有原生应用可以），本插件监听的是**DSH 页面内**的输入——你在这个界面聊天打字时猫爪实时联动，切到其他应用则不会触发。想要全局版请用桌面版 [BongoCat](https://github.com/ayangweb/BongoCat)。

## License

MIT

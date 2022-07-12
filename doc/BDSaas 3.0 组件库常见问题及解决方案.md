## 1.使用 SSH 地址拉代码

Git 开启了仓库代码权限，只允许 [BDSaas](https://github.com/BDSaaS) 组织内部成员拉取推送代码，所以必须使用 ssh 地址进行身份验证！<br>

![image-20220712162925854](\image-20220712162925854.png)

1. 配置 SSH keys

   ```sh
   $ ssh-keygen -t rsa -C "你的邮箱"
   ```

   打开 Git Bash，一路回车，然后打开 `C:\Users\你的计算机用户名\.ssh\id_rsa.pub` 如下：<br>
   ![image-20220712164252421](\image-20220712164252421.png)

   全选复制，点击 `New SSH key` 创建<br>
   ![image-20220712163509502](\image-20220712163509502.png)

2. 配置 Git 用户名和邮箱（如果没有配置的话）

   ```sh
   $ git config --global user.name "Your Name"
   $ git config --global user.email "email@example.com"
   ```

## 2.pnpm 可能出现的报错

![image-20220712164036354](\image-20220712164036354.png)

解决，管理员模式打开 `Power shell` ，运行 `pnpm setup` <br>
![img](\image-16576128083793.png)

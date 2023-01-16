
```shell
mac ~ % aws iam create-user --user-name cx_user
{
    "User": {
        "Path": "/",
        "UserName": "cx_user",
        "UserId": "AIDAU3XNRECYRMBO5REZH",
        "Arn": "arn:aws:iam::334431854769:user/cx_user",
        "CreateDate": "2023-01-16T18:22:47+00:00"
    }
}
```

```shell
mac ~ % aws iam create-policy --policy-name cx_policy --policy-document file://cx_policy.json
{
    "Policy": {
        "PolicyName": "cx_policy",
        "PolicyId": "ANPAU3XNRECYZ5QTGBGH3",
        "Arn": "arn:aws:iam::334431854769:policy/cx_policy",
        "Path": "/",
        "DefaultVersionId": "v1",
        "AttachmentCount": 0,
        "PermissionsBoundaryUsageCount": 0,
        "IsAttachable": true,
        "CreateDate": "2023-01-16T18:28:38+00:00",
        "UpdateDate": "2023-01-16T18:28:38+00:00"
    }
}
```

```shell
mac ~ % aws iam attach-user-policy --policy-arn arn:aws:iam::334431854769:policy/cx_policy --user-name cx_user
```

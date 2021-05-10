# Using SSM Parameters in AWS CDK - Complete Guide

A repository for an article on
[bobbyhadz.com](https://bobbyhadz.com/blog/aws-cdk-ssm-parameters)

## How to Use

1. Clone the repository

2. Install the dependencies

```bash
npm install
```

3. Create the secure string parameter we'll import the stack:

```bash
aws ssm put-parameter \
	--name "/my-site/db-password" \
	--value "dogsandcats123" \
	--type "SecureString"
```

4. Create the CDK stack

```bash
npx cdk deploy \
  --outputs-file ./cdk-outputs.json
```

5. Open the AWS CloudFormation Console and the stack should be created in your
   default region

6. Cleanup - delete the stack and the secure SSM parameter:

```bash
aws ssm delete-parameter \
	--name "/my-site/db-password"

npx cdk destroy
```

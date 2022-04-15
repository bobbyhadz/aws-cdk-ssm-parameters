import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cdk from 'aws-cdk-lib';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const emailParam = new ssm.StringParameter(this, 'alerts-email-param', {
      parameterName: '/my-site/alerts-email-dev',
      stringValue: 'dev-email@example.com',
      description: 'the email used for alerting for dev',
      type: ssm.ParameterType.STRING,
      tier: ssm.ParameterTier.STANDARD,
      allowedPattern: '.*',
    });

    const environmentsParam = new ssm.StringListParameter(
      this,
      'environments-param',
      {
        parameterName: '/my-site/environments',
        stringListValue: ['dev', 'test', 'prod'],
        tier: ssm.ParameterTier.ADVANCED,
      },
    );

    const importedParam1 = ssm.StringParameter.fromStringParameterAttributes(
      this,
      'imported-param-1',
      {
        parameterName: emailParam.parameterName,
        simpleName: false,
      },
    );

    const importedParam2 = ssm.StringParameter.fromStringParameterAttributes(
      this,
      'imported-param-2',
      {
        parameterName: environmentsParam.parameterName,
        simpleName: false,
      },
    );

    const importedParam3 = ssm.StringParameter.fromSecureStringParameterAttributes(
      this,
      'imported-param-3',
      {parameterName: '/my-app/dev/db-password', version: 1},
    );

    new cdk.CfnOutput(this, 'imported-param-1-value', {
      value: importedParam1.stringValue,
    });

    new cdk.CfnOutput(this, 'imported-param-2-value', {
      value: importedParam2.stringValue,
    });

    new cdk.CfnOutput(this, 'imported-param-3-value', {
      value: importedParam3.parameterName,
    });
  }
}

import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import sgNodes from '../../requests/sgNodes';
import { getType, getTypeArgumentDefinition } from '../arguments/type';
import { getNodeId, getNodeIdArgumentDefinition } from '../arguments/nodeId';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Returns all/root or finds some rendered nodes')
    .argument(...getTypeArgumentDefinition('Type of returned nodes - can be: all, root or node', {
      default: 'all',
      validator: ['all', 'root', 'find'],
    }))
    .argument(...getNodeIdArgumentDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, logger, options }) => {
      const sgNodesData = await sgNodes({
        nodeId: getNodeId(options),
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
        type: getType(args),
      });
      const sgNodesString = JSON.stringify(sgNodesData, null, '  ');

      logger.info('Nodes: %s', sgNodesString);
    });
}

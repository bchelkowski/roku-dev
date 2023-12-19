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
      validator: ['all', 'roots', 'find'],
    }))
    .argument(...getNodeIdArgumentDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, options }) => {
      const _sgNodes = await sgNodes({
        nodeId: getNodeId(args),
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
        type: getType(args),
      });

      if (_sgNodes.All_Nodes) {
        console.table(_sgNodes.All_Nodes);
      } else if (_sgNodes.Nodes_Nodes) {
        console.table(_sgNodes.Nodes_Nodes);
      } else if (_sgNodes.Root_Nodes) {
        console.table(_sgNodes.Root_Nodes);
      } else {
        console.table(_sgNodes);
      }
    });
}

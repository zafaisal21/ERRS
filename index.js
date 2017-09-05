//router is your express router included
//route should be array like this ['YourRouteName1', 'YourRouteName2']
//controller is your controller file included
//param is param you want to place in the url with format (YourRouteNameHere/YourRouteNameHere_[Yourparams])

function resource(router, route, controller, param, log){
  var params = param;

  //=====================routing loop=====================
  switch (route.length) {
    case 1:
        var index_route = '/'+route;
        var store_route = '/'+route;
        var create_route = '/'+route+'/create';
        var show_route = '/'+route+'/:'+route+'_'+params;
        var update_route = show_route;
        var destroy_route = show_route;
        var edit_route = show_route+'/edit';
      break;
    default:
        var dirty_route = [];
        var dirty_route_with_params = [];
        for (var i = 0; i < route.length; i++) {
          var route_temp = "/"+route[i]+"/:"+route[i]+"_"+params;
          dirty_route.push(route_temp);
          dirty_route_with_params.push(route_temp);
        }
        dirty_route.splice(-1, 1);

        var index_route = dirty_route.join("")+'/'+route[route.length-1];
        var store_route = index_route;
        var create_route = index_route+'/create';
        var show_route = dirty_route_with_params.join("");
        var update_route = show_route;
        var destroy_route = show_route;
        var edit_route = show_route+'/edit';
  }

  //=======================================================

  //===============Logging Available Route=================
    switch (log) {
      case 'true':
        console.log("");
        console.log('\x1b[33m%s\x1b[0m', "============================================================================================================================");
        console.log("REST API Route Available for :\x1b[33m"+route+"\x1b[0m");
        console.log("GET index : "+index_route);
        console.log("POST store : "+store_route);
        console.log("GET create : "+create_route);
        console.log("GET show : "+show_route);
        console.log("PUT/PATCH update : "+update_route);
        console.log("DELETE destroy : "+destroy_route);
        console.log("GET edit : "+edit_route);
        console.log('\x1b[33m%s\x1b[0m', "============================================================================================================================");
        console.log("");
        break;
      default:

    }
  //=======================================================
  var res = router.get(index_route, controller.index)
            .get(create_route, controller.create)
            .post(store_route, controller.store)
            .get(show_route, controller.show)
            .get(edit_route, controller.edit)
            .patch(update_route, controller.update)
            .put(update_route, controller.update)
            .delete(destroy_route, controller.destroy);

  return res;
};

module.exports.resource = resource;
